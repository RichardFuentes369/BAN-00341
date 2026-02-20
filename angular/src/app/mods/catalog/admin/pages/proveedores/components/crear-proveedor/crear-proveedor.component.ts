
import { Component, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { STORAGE_KEY_PROFILE } from '@const/app.const';
import { ProveedoresService } from '../../service/proveedores.service';

@Component({
  selector: 'app-crear-proveedor',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-proveedor.component.html',
  styleUrl: './crear-proveedor.component.scss',
})
export class CrearProveedorComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private proveedoresService: ProveedoresService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  model: {
    nit: bigint | null;
    razon_social: string,
    direccion: string,
    telefono: string,
    correo: string,
  } = {
    nit: null,
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: '',
  }

  validators = {
    nit: false,
    razon_social: false,
    direccion: false,
    telefono: false,
    correo: false,
  }

  goTo (url: string, _id: number){

    if(_id != 0){
      this.router.navigate([url], { queryParams: { id: _id } });
    }else{
      this.router.navigate([url]);
    }

  }

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    const regexNIT = /^[0-9]{8,15}$/;
    const regexPhoneCO = /^(\+57)?3\d{9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.nit = (this.model.nit === null || !regexNIT.test((this.model.nit as any).toString()));
    this.validators.razon_social = (this.model.razon_social.trim().length === 0)
    this.validators.direccion = (this.model.direccion.trim().length === 0)
    this.validators.telefono = (this.model.telefono.trim().length === 0 || !regexPhoneCO.test(this.model.telefono))
    this.validators.correo = (this.model.correo.trim().length === 0 || !regexEmail.test(this.model.correo))

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.nit && !this.validators.razon_social && !this.validators.direccion && !this.validators.telefono && !this.validators.correo) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nit && !this.validators.razon_social && !this.validators.direccion && !this.validators.telefono && !this.validators.correo
  }

  async crearProveedor(){

    if(this.isFormValid){
      let endPoint = this.proveedoresService

      const dataToSend = {
        ...this.model,
        nit: Number(this.model.nit)
      };

      const response = await endPoint.createProvider(dataToSend)
      if(response.data.status == 404){
        ocultarModalOscura()
        Swal.fire({
          title: response.data.message,
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      if(response.data.status == 200){
        ocultarModalOscura()
        Swal.fire({
          title: this.translate.instant('mod-catalog.SUPPLIER.SWAL_CREATED'),
          text: this.translate.instant('mod-catalog.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }

  }
}
