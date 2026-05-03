import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { LoteService } from '../../service/lote.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';

@Component({
  selector: 'app-crear-lote',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './crear-lote.component.html',
  styleUrl: './crear-lote.component.scss',
})
export class CrearLoteComponent implements OnInit {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  permisos_catalogo_productos: any[] = []
  permisos_catalogo_proveedores: any[] = []

  btn_new_product = false
  show_detail_product = false
  btn_new_provider = false
  form_new_provider = false
  show_detail_provider = false
  form_new_batch = false
  puedoCrearProductos = false
  puedoCrearProveedores = false

  constructor(
    private router: Router,
    private loteService: LoteService,
    private userService :AuthService,
    private permisosService :PermisosService,
    private productoService: ProductosService,
    private proveedoresService: ProveedoresService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;
      if (isValid) {
        this.buscarProducto();
        this.buscarProveedor();
      }
    });
  }

  producto = {
    nombre: '',
    marca: '',
    unidad_medida: '',
    es_perecedero: ''
  }
  
  proveedor = {
    nit: '',
    razon_social: '',
    correo: ''
  }

  model = {
    id_producto: '',
    id_proveedor: '',
    codigo_barra: '',
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    estado: ''
  }

  validators = {
    id_producto: false,
    id_proveedor: false,
    nit: false,
    codigo_barra: false,
    lote: false,
    fecha_entrada: false,
    fecha_vencimiento: false,
    cantidad_comprada: false,
    estado: false
  }

  async ngOnInit(){
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo_catalogo = await this.permisosService.permisoPage(0,'catalogo',userData.data.id)
    const permiso_submodulo_productos = await this.permisosService.permisoPage(22,'productos',userData.data.id)
    const permiso_submodulo_proveedores = await this.permisosService.permisoPage(22,'proveedores',userData.data.id)


    if (permiso_modulo_catalogo.data === "" || permiso_submodulo_productos.data === "") {
      return
    }

    const permisos_productos = await this.permisosService.permisos(userData.data.id,'productos')
    this.permisos_catalogo_productos = permisos_productos.data

    if (permiso_modulo_catalogo.data === "" || permiso_submodulo_proveedores.data === "") {
      return
    }

    const permisos_proveedores = await this.permisosService.permisos(userData.data.id,'proveedores')
    this.permisos_catalogo_proveedores = permisos_proveedores.data
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
    const regexBarCode = /^[0-9]{13}$/;
    const regexNIT = /^[0-9]{8,15}$/;
    this.validators.codigo_barra = (this.model.codigo_barra === null || !regexBarCode.test((this.model.codigo_barra as any).toString()))
    this.validators.nit = (this.proveedor.nit === null || !regexNIT.test((this.proveedor.nit as any).toString()));

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.codigo_barra && !this.validators.nit) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    $('.btnSave').removeClass('d-none')

    if(this.validators.codigo_barra){
      this.btn_new_product = false
      this.form_new_provider = false
      this.form_new_batch = false
      this.show_detail_product = false
      this.show_detail_provider = false
    }
    
    return !this.validators.codigo_barra
  }

  get esCodigoValido(): boolean {
    const codigo = (this.model?.codigo_barra || '').toString();
    const regex = /^\d{13}$/;
    return regex.test(codigo);
  }

  get longitudCodigo(): number {
    return (this.model?.codigo_barra || '').toString().length;
  }

  async buscarProducto() {
    try {
      const response = await this.productoService.getDataProductForBarcode(this.model.codigo_barra);
      if (response.status === 200) {
        this.model.id_producto = response.data.id
        this.producto.nombre = response.data.nombre
        this.producto.marca = response.data.marca.nombre
        this.producto.unidad_medida = response.data.unidad_medida
        this.producto.es_perecedero = response.data.es_perecedero
        $('.btnSave').removeClass('d-none')
        this.show_detail_product = true
        this.btn_new_product = false
        this.form_new_provider = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          $('.btnSave').addClass('d-none')
          this.show_detail_product = false
          this.show_detail_provider = false
          this.btn_new_product = true
          if(this.permisos_catalogo_productos.find(obj => obj.permiso_permiso === 'crear') == undefined) {
            this.puedoCrearProductos = false
          }else{
            this.puedoCrearProductos = true
          }
        }
      } else {
        console.error('Error de red o servidor no disponible');
      }
    }
  }

  async buscarProveedor() {
    try {
      const response = await this.proveedoresService.getDataProviderNit(this.proveedor.nit);
      if (response.status === 200) {
        this.model.id_proveedor = response.data.id
        this.proveedor.razon_social = response.data.razon_social
        this.proveedor.correo = response.data.correo
        $('.btnSave').removeClass('d-none')
        this.show_detail_provider = true
        this.btn_new_provider = false
        this.form_new_batch = true
      }
    } catch (error: any) {
      if (error.response) {
         const statusCode = error.response.status;
         if (statusCode === 404) {
           $('.btnSave').addClass('d-none')
           this.show_detail_provider = false
           this.btn_new_provider = true
           this.form_new_batch = false
           if(this.permisos_catalogo_proveedores.find(obj => obj.permiso_permiso === 'crear') == undefined) {
             this.puedoCrearProveedores = false
           }else{
             this.puedoCrearProveedores = true
           }
         }
      } else {
        console.error('Error de red o servidor no disponible');
      }
    }
  }

  async crearLote(){
    if(this.isFormValid){
      let endPoint = this.loteService

      const response = await endPoint.createBatch(this.model)
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
          title: this.translate.instant('mod-lote.CATEGORY.SWAL_CREATED'),
          text: this.translate.instant('mod-lote.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }
}
