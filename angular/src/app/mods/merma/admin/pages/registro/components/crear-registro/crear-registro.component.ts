import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { NgSelectModule } from '@ng-select/ng-select';
import { RegistroService } from '../../service/registro.service';
import { CommonModule } from '@angular/common';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { AuthService } from '@guard/service/auth.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';
import { TipoService } from '../../../tipo/service/tipo.service';


@Component({
  selector: 'app-crear-registro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './crear-registro.component.html',
  styleUrl: './crear-registro.component.scss',
})
export class CrearRegistroComponent {
  
  private validationSubject = new Subject<void>();
  isFormValid = false;
  tipos_merma: any[] = [];
  isLoading: boolean = false
  filtro: string = ''
  isReadonly:boolean = false
  permisos_catalogo_productos: any[] = []
  permisos_catalogo_proveedores: any[] = []
  permisos_bodega: any[] = []

  ultimoCodigoBarra = ''
  ultimoBatch = ''

  constructor(
    private router: Router,
    private registroService: RegistroService,
    private userService :AuthService,
    private permisosService :PermisosService,
    private productoService: ProductosService,
    private bodegaService: BodegaService,
    private proveedoresService: ProveedoresService,
    private tipoService: TipoService,
    private translate: TranslateService
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;

      this.checkValidation();

      if (this.esCodigoValido && this.producto.codigo_barra !== this.ultimoCodigoBarra) {
        this.ultimoCodigoBarra = this.producto.codigo_barra
        this.buscarProducto();
      }

      if (this.bodega.lote !== this.ultimoBatch) {
        this.ultimoBatch = this.bodega.lote
        this.buscarLote();
      }

    });
  }

  producto = {
    id: '',
    codigo_barra: '',
    nombre: '',
    marca: '',
    unidad_medida: '',
    es_perecedero: ''
  }

  bodega = {
    id: '',
    lote: '',
    fecha_entrada: '',
    es_perecedero: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    cantidad_en_bodega: '',
    estado: ''
  }

  model = {
    id_lote: '',
    id_tipo_merma: '',
    cantidad: '',
    fecha_reporte: '',
    valor_perdido: '',
    observacion: ''
  }

  validators = {
    id_producto: false,
    id_tipo_merma: false,
    id_lote: false,
    lote: false,
    codigo_barra: false,
    cantidad: false,
    fecha_reporte: false,
    valor_perdido: false,
    observacion: false
  }

  async ngOnInit(){
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo_catalogo = await this.permisosService.permisoPage(0,'catalogo',userData.data.id)
    const permiso_submodulo_productos = await this.permisosService.permisoPage(22,'productos',userData.data.id)
    const permiso_submodulo_proveedores = await this.permisosService.permisoPage(22,'proveedores',userData.data.id)
    const permiso_modulo_warehouse = await this.permisosService.permisoPage(22,'proveedores',userData.data.id)

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

    if (permiso_modulo_warehouse.data === "" || permiso_modulo_warehouse.data === "") {
      return
    }

    const permisos_de_bodega = await this.permisosService.permisos(userData.data.id,'bodega')
    this.permisos_bodega = permisos_de_bodega.data

    this.isReadonly = false
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
    this.validators.lote = (this.bodega.lote === null)
    this.validators.id_tipo_merma = (this.model.id_tipo_merma == '')
    this.validators.cantidad = (this.model.cantidad == '' || this.model.cantidad != '' && this.model.cantidad > this.bodega.cantidad_en_bodega)
    this.validators.fecha_reporte = (this.model.fecha_reporte == '')
    this.validators.valor_perdido = (this.model.valor_perdido == '')
    this.validators.observacion = (this.model.observacion == '')

    const boton = document.querySelector('.btnSave') as HTMLButtonElement
    (!this.validators.codigo_barra && !this.validators.lote && !this.validators.cantidad && !this.validators.fecha_reporte && !this.validators.valor_perdido && !this.validators.observacion) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
    
    return !this.validators.codigo_barra && !this.validators.lote && !this.validators.cantidad && !this.validators.fecha_reporte && !this.validators.valor_perdido && !this.validators.observacion
  } 

  get esCodigoValido(): boolean {
    const codigo = (this.producto?.codigo_barra || '').toString();
    const regex = /^\d{13}$/;
    return regex.test(codigo);
  }

  get longitudCodigo(): number {
    return (this.producto?.codigo_barra || '').toString().length;
  }

  formatoFecha(fecha: number){
    const date = new Date(Number(fecha) * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
  }

  form_new_product = true
  btn_new_product = false
  show_detail_product = false

  btn_new_batch = false
  form_batch = false
  show_detail_batch = false

  form_merma = false
  puedoCrearProductos = false
  puedoCrearBatch = false

  async getTiposMerma() {
    this.isLoading = true;
    try {
      const mermaList = await this.tipoService.getDataTypeSearch(this.filtro)
      this.tipos_merma = [...mermaList.data];
    } finally {
      this.isLoading = false;
    }
  }  

  onSelectChange(item: any) {
    this.model.id_tipo_merma = (item != undefined) ? item.id : null
    this.checkValidation()
  }

  onSearch(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term
      this.isLoading = true;
      this.getTiposMerma();
    }
  }

  async buscarProducto() {
    try {
      const consultaProducto = await this.productoService.getDataProductForBarcode(this.producto.codigo_barra)
      if (consultaProducto.status == 200 && consultaProducto.data.estado === true) {
        console.log('producto existe')
        console.log('esta activo')
        // this.validators.producto_inactivo = false

        // this.model.id_producto = consultaProducto.data.id
        this.producto.id = consultaProducto.data.id
        this.producto.nombre = consultaProducto.data.nombre
        this.producto.marca = consultaProducto.data.marca.nombre
        this.producto.unidad_medida = consultaProducto.data.medida.nombre
        this.producto.es_perecedero = consultaProducto.data.es_perecedero

        this.form_new_product = true
        this.btn_new_product = false
        this.show_detail_product = true

        this.form_batch = true

        const boton = document.querySelector('.btnSave') as HTMLButtonElement
        boton.classList.add('disabled')
      }
      if (consultaProducto.status == 200 && consultaProducto.data.estado === false) {
        console.log('producto existe')
        console.log('esta inactivo')
        // this.validators.producto_inactivo = true

        this.producto.nombre = ''
        this.producto.marca = ''
        this.producto.unidad_medida = ''
        this.producto.es_perecedero = ''

        this.form_new_product = true
        this.btn_new_product = false
        this.show_detail_product = false

        // this.form_new_provider = false
        // this.form_new_batch = false
        // this.proveedor.nit = ''

        this.model.id_lote = ''
        this.model.id_tipo_merma = ''
        this.model.cantidad = ''
        this.model.fecha_reporte = ''
        this.model.valor_perdido = ''
        this.model.observacion = ''
        const boton = document.querySelector('.btnSave') as HTMLButtonElement
        boton.classList.add('disabled')
      }
    } catch (error: any) {
      if (error.status == 404) {
        console.log('producto no existe')
        // this.validators.producto_inactivo = false

        this.producto.nombre = ''
        this.producto.marca = ''
        this.producto.unidad_medida = ''
        this.producto.es_perecedero = ''

        this.model.id_lote = ''
        this.model.id_tipo_merma = ''
        this.model.cantidad = ''
        this.model.fecha_reporte = ''
        this.model.valor_perdido = ''
        this.model.observacion = ''

        this.form_new_product = true
        this.btn_new_product = true
        this.show_detail_product = false
        if (this.permisos_catalogo_productos.find(obj => obj.permiso_permiso === 'crear') == undefined) {
          this.puedoCrearProductos = false
        } else {
          this.puedoCrearProductos = true
        }

        // this.form_new_provider = false
        // this.form_new_batch = false
        // this.proveedor.nit = ''

        this.model.id_lote = ''
        this.model.id_tipo_merma = ''
        this.model.cantidad = ''
        this.model.fecha_reporte = ''
        this.model.valor_perdido = ''
        this.model.observacion = ''
        const boton = document.querySelector('.btnSave') as HTMLButtonElement
        boton.classList.add('disabled')
      }
    }
  }

  async buscarLote() {
    try {
      const response = await this.bodegaService.getDataLoteAndProduct(this.bodega.lote, this.producto.id);
      if (response.status === 200) {
        const boton = document.querySelector('.btnSave') as HTMLButtonElement
        boton.classList.add('disabled')

        this.bodega.id = response.data.id
        this.bodega.fecha_entrada = this.formatoFecha(response.data.fecha_entrada)
        this.bodega.es_perecedero = response.data.id_producto.es_perecedero
        this.bodega.fecha_vencimiento = this.formatoFecha(response.data.fecha_vencimiento)
        this.bodega.cantidad_comprada = response.data.cantidad_comprada
        this.bodega.cantidad_vendida = response.data.cantidad_vendida
        this.bodega.cantidad_en_bodega = response.data.cantidad_en_bodega
        this.bodega.estado = response.data.estado
        this.show_detail_batch = true

        this.btn_new_batch = false
        this.puedoCrearBatch = false

        this.model.id_lote = response.data.id
        this.model.id_tipo_merma = ''
        this.model.cantidad = ''
        this.model.fecha_reporte = ''
        this.model.valor_perdido = ''
        this.model.observacion = ''
        
        await this.getTiposMerma();
        this.form_merma = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          this.show_detail_batch = false
          this.btn_new_batch = true
          this.form_batch = true
          if(this.permisos_bodega.find(obj => obj.permiso_permiso === 'crear') == undefined) {
            this.puedoCrearBatch = false
          }else{
            this.puedoCrearBatch = true
          }
          this.form_merma = false
          const boton = document.querySelector('.btnSave') as HTMLButtonElement
          boton.classList.add('disabled')
        }

        this.model.id_lote = ''
        this.model.id_tipo_merma = ''
        this.model.cantidad = ''
        this.model.fecha_reporte = ''
        this.model.valor_perdido = ''
        this.model.observacion = ''
      } else {
        console.error('Error de red o servidor no disponible');
      }
    }
  }

  async crearRegistro(){
    if(this.isFormValid){
      let endPoint = this.registroService

      const response = await endPoint.createRegister(this.model)
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
          title: this.translate.instant('mod-merma.TYPE.SWAL_CREATED'),
          text: this.translate.instant('mod-merma.SWAL_CREATED_RECORD'),
          icon: "success"
        });
      }
    }
  }

  mostrarSeccion = {
    productSeccion: true,
    batchSeccion: true,
    registerSeccion: true,
  }

  toogleSection(sectionActive: string){
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }

}
