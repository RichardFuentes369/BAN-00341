import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { BodegaService } from '../../service/warehouse.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';

@Component({
  selector: 'app-crear-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './crear-warehouse.component.html',
  styleUrl: './crear-warehouse.component.scss',
})
export class CrearWarehouseComponent implements OnInit {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  permisos_catalogo_productos: any[] = []
  permisos_catalogo_proveedores: any[] = []

  constructor(
    private router: Router,
    private bodegaService: BodegaService,
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
      }
    });
  }

  producto = {
    codigo_barra: '',
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
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    estado: ''
  }

  validators = {
    producto_inactivo: false,
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
    this.validators.codigo_barra = (this.producto.codigo_barra === null || !regexBarCode.test((this.producto.codigo_barra as any).toString()))
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
    const codigo = (this.producto?.codigo_barra || '').toString();
    const regex = /^\d{13}$/;
    return regex.test(codigo);
  }

  get longitudCodigo(): number {
    return (this.producto?.codigo_barra || '').toString().length;
  }

  form_new_product = true
  btn_new_product = false
  show_detail_product = false

  btn_new_provider = false
  form_new_provider = false
  show_detail_provider = false

  form_new_batch = false

  puedoCrearProductos = false
  puedoCrearProveedores = false

  async buscarProducto() {
    try {
      const consultaProducto = await this.productoService.getDataProductForBarcode(this.producto.codigo_barra)
      if(consultaProducto.status == 200 && consultaProducto.data.estado === true){
        console.log('producto existe')
        console.log('esta activo')
        this.validators.producto_inactivo = false

        this.model.id_producto = consultaProducto.data.id
        this.producto.nombre = consultaProducto.data.nombre
        this.producto.marca = consultaProducto.data.marca.nombre
        this.producto.unidad_medida = consultaProducto.data.medida.nombre
        this.producto.es_perecedero = consultaProducto.data.es_perecedero
        
        this.form_new_product = true
        this.btn_new_product = false
        this.show_detail_product = true

        this.form_new_provider = true
        this.form_new_batch = true
        $('.btnSave').prop('disabled', true);

        this.buscarProveedor()
      }
      if(consultaProducto.status == 200 && consultaProducto.data.estado === false){
        console.log('producto existe')
        console.log('esta inactivo')
        this.validators.producto_inactivo = true

        this.producto.nombre = ''
        this.producto.marca = ''
        this.producto.unidad_medida = ''
        this.producto.es_perecedero = ''
        
        this.form_new_product = true
        this.btn_new_product = false
        this.show_detail_product = false
        
        this.form_new_provider = false
        this.form_new_batch = false
        this.proveedor.nit = ''

        this.model.id_producto = ''
        this.model.lote = ''
        this.model.fecha_entrada = ''
        this.model.fecha_vencimiento = ''
        this.model.cantidad_comprada = ''
        this.model.estado = ''
        $('.btnSave').prop('disabled', true);
      }
    } catch (error: any) {
      if(error.status == 404){
        console.log('producto no existe')
        this.validators.producto_inactivo = false

        this.producto.nombre = ''
        this.producto.marca = ''
        this.producto.unidad_medida = ''
        this.producto.es_perecedero = ''

        this.model.id_producto = ''
        this.model.lote = ''
        this.model.fecha_entrada = ''
        this.model.fecha_vencimiento = ''
        this.model.cantidad_comprada = ''
        this.model.estado = ''

        this.form_new_product = true
        this.btn_new_product = true
        this.show_detail_product = false
        if(this.permisos_catalogo_productos.find(obj => obj.permiso_permiso === 'crear') == undefined) {
          this.puedoCrearProductos = false
        }else{
          this.puedoCrearProductos = true
        }

        this.form_new_provider = false
        this.form_new_batch = false
        this.proveedor.nit = ''

        this.model.id_producto = ''
        this.model.lote = ''
        this.model.fecha_entrada = ''
        this.model.fecha_vencimiento = ''
        this.model.cantidad_comprada = ''
        this.model.estado = ''
        $('.btnSave').prop('disabled', true);
      }
    }
  }

  async buscarProveedor() {
    try {
      const consultaProveedor = await this.proveedoresService.getDataProviderNit(this.proveedor.nit)
      if(consultaProveedor.status == 200){
        console.log('proveedor existe')

        this.model.id_proveedor = consultaProveedor.data.id
        this.proveedor.nit = consultaProveedor.data.nit
        this.proveedor.razon_social = consultaProveedor.data.razon_social
        this.proveedor.correo = consultaProveedor.data.correo
        
        this.form_new_provider = true
        if(this.model.id_proveedor != ''){
          this.btn_new_provider = false
        }
        this.show_detail_provider = true
        
        this.form_new_batch = true
        $('.btnSave').prop('disabled', true);
      }
    } catch (error: any) {
      if(error.status == 404){
        console.log('proveedor no existe')

        this.model.id_proveedor = ''
        this.model.lote = ''
        this.model.fecha_entrada = ''
        this.model.fecha_vencimiento = ''
        this.model.cantidad_comprada = ''
        this.model.estado = ''
        this.proveedor.razon_social = ''
        this.proveedor.correo = ''

        this.form_new_provider = true
        this.btn_new_provider = true
        this.show_detail_provider = false
        if(this.permisos_catalogo_proveedores.find(obj => obj.permiso_permiso === 'crear') == undefined) {
          this.puedoCrearProveedores = false
        }else{
          this.puedoCrearProveedores = true
        }

        this.form_new_batch = false

        this.model.id_producto = ''
        this.model.lote = ''
        this.model.fecha_entrada = ''
        this.model.fecha_vencimiento = ''
        this.model.cantidad_comprada = ''
        this.model.estado = ''
        $('.btnSave').prop('disabled', true);
      }
    }
  }

  async crearLote(){
    if(this.isFormValid){
      let endPoint = this.bodegaService
      const response = await endPoint.createBatch(this.model)
      // if(response.data.status == 404){
      //   ocultarModalOscura()
      //   Swal.fire({
      //     title: response.data.message,
      //     text: response.data.error,
      //     icon: 'error',
      //     confirmButtonText: 'Cool'
      //   })
      // }
      // if(response.data.status == 200){
      //   ocultarModalOscura()
      //   Swal.fire({
      //     title: this.translate.instant('mod-lote.CATEGORY.SWAL_CREATED'),
      //     text: this.translate.instant('mod-lote.SWAL_CREATED_RECORD'),
      //     icon: "success"
      //   });
      // }
    }
  }
}