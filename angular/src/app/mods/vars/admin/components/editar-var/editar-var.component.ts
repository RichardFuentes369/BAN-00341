import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VarService } from '../../pages/var/service/var.service';
import { JsonService } from '../../pages/json/service/json.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { HighlightModule } from 'ngx-highlightjs';
import { debounceTime, map } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { ocultarModalOscura } from '@function/System';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

interface VarJsonInterface {
  'id': number,
  'nombre': string,
  'valor': string
}

@Component({
  selector: 'app-editar-var',
  standalone: true,
  imports: [TranslateModule, FormsModule, HighlightModule],
  templateUrl: './editar-var.component.html',
  styleUrl: './editar-var.component.scss',
})
export class EditarVarComponent implements OnInit {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private varService: VarService,
    private jsonService: JsonService,
    private translate: TranslateService
  ) {
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  varJson: VarJsonInterface[] = []
  varJsonReal: any
  permisos: any[] = []
  varReal: any
  tipoVariable: string = ''

  model = {
    id: '',
    nombre: '',
    valor: ''
  }

  validators = {
    nombre: false,
    valor: false
  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {
    this.validators.nombre = (this.model.nombre.length === 0)
    this.validators.valor = (this.model.valor.length === 0)

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nombre && !this.validators.valor) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.nombre && !this.validators.valor
  }

  async ngOnInit() {
    try {
      await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);

      const queryParams = this.route.snapshot.queryParams;
      const varId = queryParams['id_var_var'] || queryParams['id_var_json'];

      if (varId) {
        this.tipoVariable = queryParams['id_var_var'] ? 'var' : 'json'
        const service = queryParams['id_var_var'] ? this.varService : this.jsonService;
        this.varJsonReal = await service.getDataVar(varId);
      }


    this.varJson.push(this.varJsonReal.data)
    this.model.id = this.varJsonReal.data.id
    this.model.nombre = this.varJsonReal.data.nombre
    this.model.valor = this.varJsonReal.data.valor
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

  async actualizarData() {

    if (this.isFormValid) {
      const queryParams = this.route.snapshot.queryParams;
      const service = queryParams['id_var_var'] ? this.varService : this.jsonService;

      await service.updateVar(
        {
          "nombre": this.model.nombre,
          "valor": this.model.valor
        },
        this.model.id
      ).then((response) => {
        ocultarModalOscura()
        this.translate.get('mod-vars.SWAL_ARE_YOU_SURE_UPDATE_VAR').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-vars.SWAL_UPDATED'),
            text: this.translate.instant('mod-vars.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        })
      }).catch(async error => {
        this.ngOnInit()
        if (typeof (error.response.data.message) == 'string') {
          Swal.fire(error.response.data.message);
        } else {
          Swal.fire(error.response.data.message[0]);
        }
      })
    }

  }
}
