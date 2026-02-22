import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { CategoriasService } from '@mod/catalog/admin/pages/categorias/service/categorias.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { Permisos } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { TipoService } from '../../service/tipo.service';

interface TipoInterface {
  'id': number,
  'nombre': string,
}

@Component({
  selector: 'app-ver-tipo',
  standalone: true,
  imports: [TranslateModule],
  templateUrl: './ver-tipo.component.html',
  styleUrl: './ver-tipo.component.scss',
})
export class VerTipoMermaComponent implements OnInit{

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private userService :AuthService,
    private permisosService :PermisosService,
    private tipoService :TipoService,
  ) { }

  tipo: TipoInterface[] = []
  permisos: any[] = []
  tipoReal: any

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.tipoReal = await this.tipoService.getDataTipo(this.route.snapshot.queryParams?.['id_tipo_merma'])

    this.tipo.push(this.tipoReal.data)
  }

}

