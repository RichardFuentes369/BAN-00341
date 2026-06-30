import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VarService } from '../../pages/var/service/var.service';
import { JsonService } from '../../pages/json/service/json.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { JsonPipe } from '@angular/common';
import { HighlightModule } from 'ngx-highlightjs';

interface VarJsonInterface {
  'id': number,
  'nombre': string,
  'valor': string
}

@Component({
  selector: 'app-ver-var',
  standalone: true,
  imports: [TranslateModule, JsonPipe, HighlightModule],
  templateUrl: './ver-var.component.html',
  styleUrl: './ver-var.component.scss',
})
export class VerVarComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private varService: VarService,
    private jsonService: JsonService
  ) { }

  varJson: VarJsonInterface[] = []
  permisos: any[] = []
  varReal: any
  tipoVariable: string = ''

  async ngOnInit() {
    try {
      await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);

      const queryParams = this.route.snapshot.queryParams;
      const varId = queryParams['id_var_var'] || queryParams['id_var_json'];

      if (varId) {
        this.tipoVariable = queryParams['id_var_var'] ? 'var' : 'json'
        const service = queryParams['id_var_var'] ? this.varService : this.jsonService;
        const response = await service.getDataVar(varId);

        if (response?.data) {
          this.varJson.push(response.data);
        }
      }
    } catch (error) {
      console.error('Error al inicializar el componente:', error);
    }
  }

  parseJson(data: any) {
    try {
      return JSON.parse(data);
    } catch (e) {
      return data;
    }
  }

  tienePermiso(nombre: string): boolean {
    return this.permisos.some((permiso) => permiso.permiso_permiso === nombre);
  }

  goTo(url: string, _id: number) {

    if (_id != 0) {
      this.router.navigate([url], { queryParams: { id: _id } });
    } else {
      this.router.navigate([url]);
    }

  }
}
