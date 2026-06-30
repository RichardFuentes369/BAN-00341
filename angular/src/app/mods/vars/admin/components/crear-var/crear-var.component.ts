import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map, filter } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { STORAGE_KEY_PROFILE } from '@const/app.const';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VarService } from '../../pages/var/service/var.service';
import { JsonService } from '../../pages/json/service/json.service';

@Component({
  selector: 'app-crear-var',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-var.component.html',
  styleUrl: './crear-var.component.scss'
})

export class CrearVarComponent implements OnInit {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  tipoVariable: string = ''

  constructor(
    private router: Router,
    private route: ActivatedRoute,
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

  model = {
    nombre: '',
    valor: ''
  }

  validators = {
    name: false,
    value: false
  }

  async ngOnInit() {
    const currentUrl = this.router.url
    if (currentUrl.includes('/var')) {
      this.tipoVariable = 'var';
    }
    if (currentUrl.includes('/json')) {
      this.tipoVariable = 'json';
    }
  }

  goTo(url: string, _id: number) {

    if (_id != 0) {
      this.router.navigate([url], { queryParams: { id: _id } });
    } else {
      this.router.navigate([url]);
    }

  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.name = (this.model.nombre.length === 0)
    this.validators.value = (this.model.valor.length === 0)

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.name && !this.validators.value) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.name && !this.validators.value
  }

  async crearVariable() {

    if (this.isFormValid) {

      const service = (this.tipoVariable == 'var') ? this.varService : this.jsonService;
      const response = await service.createVar(this.model)

      if (response.data.status == 404) {
        ocultarModalOscura()
        Swal.fire({
          title: response.data.message,
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      if (response.data.status == 200) {
        ocultarModalOscura()
        Swal.fire({
          title: this.translate.instant('mod-users.SWAL_CREATED'),
          text: this.translate.instant('mod-users.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }

  }

}
