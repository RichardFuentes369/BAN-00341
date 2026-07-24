import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { PermisosService } from '@service/globales/permisos/permisos.service';
import { AuthService } from '@guard/service/auth.service';

import { ocultarModalOscura, Permisos } from '@function/System'
import { STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { RegistroService } from '../../service/registro.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { debounceTime, map, Subject } from 'rxjs';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';
import { TipoService } from '../../../tipo/service/tipo.service';
import Swal from 'sweetalert2';

interface RegistroInterface {
  'id': number,
  'cantidad': number,
  'fecha_reporte': number | string,
  'valor_perdido': number,
  'observacion': string,
}

@Component({
  selector: 'app-editar-registro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './editar-registro.component.html',
  styleUrl: './editar-registro.component.scss',
})
export class EditarRegistroComponent {

  private validationSubject = new Subject<void>();
  isFormValid = false;
  permisos_catalogo_productos: any[] = []
  permisos_lote: any[] = []

  tipos_merma: any[] = [];
  isLoading: boolean = false
  filtro: string = ''

  btn_new_product = false
  show_detail_product = false
  form_new_product = false
  btn_new_lote = false
  form_new_lote = false
  show_detail_lote = false
  form_new_merma = false
  puedoCrearProductos = false
  puedoCrearLote = false
  show_detail_merma = false

  constructor(
    private router: Router,
    private route :ActivatedRoute,
    private registroService: RegistroService,
    private userService :AuthService,
    private permisosService :PermisosService,
    private productoService: ProductosService,
    private bodegaService: BodegaService,
    private proveedoresService: ProveedoresService,
    private tipoService: TipoService,
    private translate: TranslateService,
  ){
    this.validationSubject.pipe(
      debounceTime(300), 
      map(() => this.checkValidation())
    ).subscribe(isValid => {
      this.isFormValid = isValid;

      if (isValid) {
        this.buscarProducto();
        this.buscarLote();
      }

    });
  }

  registro: RegistroInterface[] = []
  permisos: any[] = []
  registroReal: any

  producto = {
    id: '',
    codigo_barra: '',
    nombre: '',
    marca: '',
    unidad_medida: '',
    es_perecedero: ''
  }

  bodega = {
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    cantidad_en_bodega: '',
    estado: ''
  }

  cantidad_old = ''
  cantidad_afectada_por_merma = ''

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
    cantidad_mayor: false,
    fecha_reporte: false,
    valor_perdido: false,
    observacion: false
  }

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);
    
    this.permisos_catalogo_productos = (await this.permisosService.permisos(userData.data.id,'productos')).data
    this.permisos_lote = (await this.permisosService.permisos(userData.data.id,'bodega')).data

    // validaciones de permisos

    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.registroReal = await this.registroService.getDataRegister(this.route.snapshot.queryParams?.['id_merma'])

    this.producto.id = this.registroReal.data.id_lote.id_producto.id
    this.producto.codigo_barra = this.registroReal.data.id_lote.id_producto.codigo_barra
    this.producto.nombre = this.registroReal.data.id_lote.id_producto.nombre
    this.producto.marca = this.registroReal.data.id_lote.id_producto.nombre
    this.producto.unidad_medida = this.registroReal.data.id_lote.id_producto.medida.nombre
    this.producto.es_perecedero = this.registroReal.data.id_lote.id_producto.es_perecedero

    this.bodega.lote = this.registroReal.data.id_lote.lote
    this.bodega.fecha_entrada = this.registroReal.data.id_lote.fecha_entrada
    this.bodega.fecha_vencimiento = this.registroReal.data.id_lote.fecha_vencimiento
    this.bodega.cantidad_comprada = this.registroReal.data.id_lote.cantidad_comprada
    this.bodega.cantidad_vendida = this.registroReal.data.id_lote.cantidad_vendida
    this.bodega.cantidad_en_bodega = this.registroReal.data.id_lote.cantidad_en_bodega
    this.bodega.estado = this.registroReal.data.id_lote.estado

    await this.buscarProducto()
    await this.buscarLote()

    this.cantidad_old = this.registroReal.data.cantidad
    this.cantidad_afectada_por_merma = this.registroReal.data.id_lote.total_mermas
    this.model.id_lote = this.registroReal.data.id_lote.id
    this.model.id_tipo_merma = this.registroReal.data.id_tipo_merma.id
    this.model.cantidad = this.registroReal.data.cantidad
    this.model.fecha_reporte = (this.registroReal.data.fecha_reporte != '') ? this.formatoFecha(this.registroReal.data.fecha_reporte) : ''
    this.model.valor_perdido = this.registroReal.data.valor_perdido
    this.model.observacion = this.registroReal.data.observacion
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
    this.validators.lote = (this.bodega.lote === null || this.bodega.lote  == '')
    this.validators.cantidad = true
    this.validators.fecha_reporte = (this.model.fecha_reporte === null || this.model.fecha_reporte  == '')
    this.validators.valor_perdido = (this.model.valor_perdido === null || this.model.valor_perdido  == '')
    this.validators.observacion = (this.model.observacion === null || this.model.observacion  == '')
   
    if(this.validators.codigo_barra){
      this.btn_new_product = false
      this.show_detail_product = false
      this.form_new_lote = false
      this.btn_new_lote = false
      this.show_detail_lote = false
      this.form_new_merma  = false
      this.show_detail_merma = false
    }

    if(this.validators.lote){
      this.show_detail_merma = false
    }

    if(this.validators.cantidad){
      // console.log('aqui estoy')
      // console.log('***********************')
      // console.log('new: '+this.model.cantidad)
      // console.log('old: '+this.cantidad_old)

      if(parseInt(this.model.cantidad) != parseInt(this.cantidad_old)){
        const totalBodega = parseInt(this.bodega.cantidad_comprada); //A
        const inventarioActual = parseInt(this.bodega.cantidad_en_bodega); //A
        const cantidadAnteriorM = parseInt(this.cantidad_old); // B
        const viejaCantidadM = parseInt(this.cantidad_old); // D
        const nuevaCantidadM = parseInt(this.model.cantidad); // D
        const totalMermas = parseInt(this.cantidad_afectada_por_merma); // R
        const totalVentas = parseInt(this.bodega.cantidad_vendida); // T
        const stockTotal = totalMermas + inventarioActual + totalVentas; // P
        // console.log('cantidad comprada:' + stockTotal)
  
        if(nuevaCantidadM>cantidadAnteriorM){
          if(inventarioActual>nuevaCantidadM){
            this.validators.cantidad = false
            this.validators.cantidad_mayor = false
            const nuevaCantidadBodega = (inventarioActual + cantidadAnteriorM) - nuevaCantidadM
            // console.log('actualizo la merma con la cantidad: '+ nuevaCantidadM)
            // console.log('actualizo la nueva cantidad_bodega: '+nuevaCantidadBodega)
          }
          if(nuevaCantidadM>inventarioActual){
            if((nuevaCantidadM-viejaCantidadM) === inventarioActual){
              this.validators.cantidad = false
              this.validators.cantidad_mayor = false
              // console.log('actualizo la merma con la cantidad: '+ (inventarioActual+viejaCantidadM))
              // console.log('actualizo la nueva cantidad_bodega: '+ 0)
            }
          }
          if(inventarioActual == nuevaCantidadM){
            this.validators.cantidad = false
            this.validators.cantidad_mayor = false
            // console.log('actualizo la merma con la cantidad: '+ nuevaCantidadM)
            // console.log('actualizo la nueva cantidad_bodega: '+ viejaCantidadM)
          }
          if(inventarioActual < nuevaCantidadM){
            this.validators.cantidad_mayor = true
            // console.log('error: cantidad superior a la cantidad registrada en bodega')
          }
        }
        if(nuevaCantidadM<cantidadAnteriorM){
          if(nuevaCantidadM<totalBodega){
            this.validators.cantidad = false
            this.validators.cantidad_mayor = false
            const nuevaCantidadBodega = (inventarioActual + cantidadAnteriorM) - nuevaCantidadM
            // console.log('actualizo la merma con la cantidad: '+ nuevaCantidadM)
            // console.log('actualizo la nueva cantidad_bodega: '+ nuevaCantidadBodega)
          }else{
            this.validators.cantidad = true
            // console.log('error: no cuenta con inventario suficiente para actualizar')
          }
        }
      }else{
        this.validators.cantidad = false
        this.validators.cantidad_mayor = false
      }
    }

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
    (
      !this.validators.cantidad && 
      !this.validators.cantidad_mayor &&
      !this.validators.codigo_barra && 
      !this.validators.fecha_reporte && 
      !this.validators.id_lote && 
      !this.validators.id_producto && 
      !this.validators.id_tipo_merma && 
      !this.validators.lote && 
      !this.validators.observacion && 
      !this.validators.valor_perdido  
    ) ? boton.classList.remove('disabled') : boton.classList.add('disabled')

    return !this.validators.cantidad && !this.validators.cantidad_mayor && !this.validators.codigo_barra && !this.validators.fecha_reporte && !this.validators.id_lote && !this.validators.id_producto && !this.validators.id_tipo_merma && !this.validators.lote && !this.validators.observacion && !this.validators.valor_perdido 
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
      const response = await this.productoService.getDataProductForBarcode(this.producto.codigo_barra);
      if (response.status === 200) {
        this.producto.id = response.data.id
        this.producto.nombre = response.data.nombre
        this.producto.marca = response.data.marca.nombre
        this.producto.unidad_medida = response.data.medida.nombre
        this.producto.es_perecedero = response.data.es_perecedero
        this.show_detail_product = true
        this.btn_new_product = false
        this.form_new_lote = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
          boton.classList.add('disabled')
          this.show_detail_product = false
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

  async buscarLote() {
    try {
      const response = await this.bodegaService.getDataLoteAndProduct(this.bodega.lote, this.producto.id);
      if (response.status === 200) {
        this.model.id_lote = response.data.id
        this.bodega.fecha_entrada = this.formatoFecha(response.data.fecha_entrada)
        this.bodega.fecha_vencimiento = (response.data.fecha_vencimiento != '') ? this.formatoFecha(response.data.fecha_vencimiento) : ''
        this.bodega.cantidad_comprada = response.data.cantidad_comprada
        this.bodega.cantidad_vendida = response.data.cantidad_vendida
        this.bodega.cantidad_en_bodega = response.data.cantidad_en_bodega
        this.bodega.estado = response.data.estado
        
        this.show_detail_lote = true
        this.btn_new_lote = false
        
        await this.getTiposMerma();
        this.show_detail_merma = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          this.show_detail_lote = false
          this.btn_new_lote = true
          this.form_new_lote = false
          if(this.permisos_lote.find(obj => obj.permiso_permiso === 'crear') == undefined) {
            this.puedoCrearLote = false
          }else{
            this.puedoCrearLote = true
          }
          this.form_new_merma = false
          const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
          boton.classList.add('disabled')
        }
      } else {
        console.error('Error de red o servidor no disponible');
      }
    }
  }

  async getTiposMerma() {
    this.isLoading = true;
    try {
      const mermaList = await this.tipoService.getDataTypeSearch(this.filtro)
      this.tipos_merma = [...mermaList.data];
    } finally {
      this.isLoading = false;
    }
  }  

  async actualizarData(){
    if(this.isFormValid){
      let endPoint = this.registroService
      const response = await endPoint.updateRegister(this.model, this.route.snapshot.queryParams?.['id_merma'])
      if(response.status == 404){
        ocultarModalOscura()
        Swal.fire({
          title: response.data.message,
          text: response.data.error,
          icon: 'error',
          confirmButtonText: 'Cool'
        })
      }
      if(response.status == 200){
        ocultarModalOscura()
        Swal.fire({
          title: this.translate.instant('mod-merma.TYPE.SWAL_UPDATED'),
          text: this.translate.instant('mod-merma.SWAL_UPDATED_RECORD'),
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

