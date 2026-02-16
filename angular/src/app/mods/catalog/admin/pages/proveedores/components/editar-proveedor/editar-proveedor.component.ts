import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';

import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import Swal from 'sweetalert2'
import { ocultarModalOscura } from '@function/System';
import { AuthService } from '@guard/service/auth.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';

interface ProveedorInterface {
  'id': number,
  'nit': string,
  'razon_social': string,
  'direccion': string,
  'correo': string,
  'telefono': string,
}

@Component({
  selector: 'app-editar-proveedor',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './editar-proveedor.component.html',
  styleUrl: './editar-proveedor.component.scss',
})
export class EditarProveedorComponent implements OnInit{

  private validationSubject = new Subject<void>();
  isFormValid = false;

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private proveedoresService: ProveedoresService,
    private userService :AuthService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
    });
  }

  model = {
    id: '',
    nit: '',
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

  proveedor: ProveedorInterface[] = []
  proveedorReal: any

  onInputChange() {
    this.validationSubject.next();
  }

  checkValidation(): boolean {

    const regexNIT = /^[0-9]{8,15}$/;
    const regexPhoneCO = /^(\+57)?3\d{9}$/;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    this.validators.nit = (this.model.nit.length === 0 || !regexNIT.test(this.model.nit))
    this.validators.razon_social = (this.model.razon_social.length === 0)
    this.validators.direccion = (this.model.direccion.length === 0)
    this.validators.telefono = (this.model.telefono.length === 0 || !regexPhoneCO.test(this.model.telefono))
    this.validators.correo = (this.model.correo.length === 0 || !regexEmail.test(this.model.correo))

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (!this.validators.nit && !this.validators.razon_social && !this.validators.direccion && !this.validators.telefono && !this.validators.correo) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.nit && !this.validators.razon_social && !this.validators.direccion && !this.validators.telefono && !this.validators.correo
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.proveedorReal = await this.proveedoresService.getDataProvider(this.route.snapshot.queryParams?.['id'])

    this.proveedor.push(this.proveedorReal.data)

    this.model.id = this.proveedorReal.data.id
    this.model.nit = this.proveedorReal.data.nit
    this.model.razon_social = this.proveedorReal.data.razon_social
    this.model.direccion = this.proveedorReal.data.direccion
    this.model.telefono = this.proveedorReal.data.telefono
    this.model.correo = this.proveedorReal.data.correo
  }

  async actualizarData(){

    if(this.isFormValid){
      let endPoint = this.proveedoresService
  
      await endPoint.updateProvider(
        {
          "nit": this.model.nit,
          "razon_social": this.model.razon_social,
          "direccion": this.model.direccion,
          "telefono": this.model.telefono,
          "correo": this.model.correo,
        },
        this.model.id
      ).then((response) =>{
        ocultarModalOscura()
        this.translate.get('mod-catalog.SUPPLIER.SWAL_ARE_YOU_SURE_UPDATE').subscribe((translatedTitle: string) => {
          Swal.fire({
            title: this.translate.instant('mod-catalog.SUPPLIER.SWAL_UPDATED'),
            text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
            icon: "success"
          });
        })
      }).catch(async error => {
        this.ngOnInit()
        if(typeof(error.response.data.message) == 'string'){
          Swal.fire(error.response.data.message);
        }else{
          Swal.fire(error.response.data.message[0]);
        }
      })
    }

  }

}
