import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, map } from 'rxjs/operators';

import { TranslateModule, TranslateService } from '@ngx-translate/core';

import Swal from 'sweetalert2'
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ocultarModalOscura } from '@function/System'
import { FinalService } from '@mod/users/admin/pages/finales/service/final.service';
import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_PROFILE } from '@const/app.const';
import { BodegaService } from '../../service/warehouse.service';
import { AuthService } from '@guard/service/auth.service';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { CommonModule } from '@angular/common';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { ProveedoresService } from '@mod/catalog/admin/pages/proveedores/service/proveedores.service';

interface LoteInterface {
  'id': number,
  'lote': string,
  'fecha_entrada': number,
  'fecha_vencimiento': number | string,
  'cantidad_comprada': number,
  'cantidad_vendida': number,
  'cantidad_en_bodega': number,
  'cantidad_afectada_por_merma': number,
  'stock': number,
  'costo_unitario': number,
  'precio_venta_sugerido': number,
  'estado': string
}

@Component({
  selector: 'app-editar-warehouse',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
    TablecrudComponent
  ],
  templateUrl: './editar-warehouse.component.html',
  styleUrl: './editar-warehouse.component.scss',
})
export class EditarWarehouseComponent {

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
    private route: ActivatedRoute,
    private bodegaService: BodegaService,
    private userService: AuthService,
    private permisosService: PermisosService,
    private productoService: ProductosService,
    private proveedoresService: ProveedoresService,
    private translate: TranslateService
  ) {
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

  id_lote = ''
  lote: LoteInterface[] = []
  permisos: any[] = []
  loteReal: any

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

  cantidad_afectada_por_merma = ''

  model = {
    id_producto: '',
    id_proveedor: '',
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    cantidad_en_bodega: 0,
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
    estado: false,
    menor_a_merma_mas_vendida: false
  }

  cargarIdioma = true
  accioneson = false
  endPoint = ``
  columnas: any[] = [
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_AMOUNT'),
      data: 'cantidad',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_REPORT_DATE'),
      data: 'fecha_reporte',
      className: 'text-center',
      render: (data: any) => {
        if (!data) return '';
        const date = new Date(Number(data) * 1000);
        if (isNaN(date.getTime())) {
          return 'Fecha inválida';
        }
        return date.toLocaleDateString('es-CO', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      }
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_LOST_VALUE'),
      data: 'valor_perdido',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_OBSERVATION'),
      data: 'observacion',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_TYPE'),
      data: 'id_tipo_merma.nombre',
      className: 'text-center'
    },
  ];
  titlePage = this.translate.instant('mod-warehouse.TABLE_TITLE')

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo_catalogo = await this.permisosService.permisoPage(0, 'catalogo', userData.data.id)
    const permiso_submodulo_productos = await this.permisosService.permisoPage(22, 'productos', userData.data.id)
    const permiso_submodulo_proveedores = await this.permisosService.permisoPage(22, 'proveedores', userData.data.id)


    if (permiso_modulo_catalogo.data === "" || permiso_submodulo_productos.data === "") {
      return
    }

    const permisos_productos = await this.permisosService.permisos(userData.data.id, 'productos')
    this.permisos_catalogo_productos = permisos_productos.data

    if (permiso_modulo_catalogo.data === "" || permiso_submodulo_proveedores.data === "") {
      return
    }

    const permisos_proveedores = await this.permisosService.permisos(userData.data.id, 'proveedores')
    this.permisos_catalogo_proveedores = permisos_proveedores.data

    let idLote = this.route.snapshot.queryParams?.['id_lote']
    if (idLote) {
      this.endPoint = `registro-mermas/obtener-registro-mermas?id_lote=${idLote}`
    }

    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.loteReal = await this.bodegaService.getDataLote(idLote)

    this.producto.codigo_barra = this.loteReal.data.id_producto.codigo_barra
    this.producto.nombre = this.loteReal.data.id_producto.nombre
    this.producto.marca = this.loteReal.data.id_producto.marca.nombre
    this.producto.unidad_medida = this.loteReal.data.id_producto.medida.nombre
    this.producto.es_perecedero = this.loteReal.data.id_producto.es_perecedero

    this.proveedor.nit = this.loteReal.data.id_proveedor.nit
    this.proveedor.razon_social = this.loteReal.data.id_proveedor.razon_social
    this.proveedor.correo = this.loteReal.data.id_proveedor.correo

    await this.buscarProducto()
    await this.buscarProveedor()

    this.model.id_producto = ''
    this.model.id_proveedor = ''
    this.producto.codigo_barra = this.loteReal.data.id_producto.codigo_barra
    this.model.lote = this.loteReal.data.lote
    this.model.fecha_entrada = this.formatoFecha(this.loteReal.data.fecha_entrada)
    this.model.fecha_vencimiento = this.formatoFecha(this.loteReal.data.fecha_vencimiento)
    this.model.cantidad_comprada = this.loteReal.data.cantidad_comprada
    this.model.cantidad_vendida = this.loteReal.data.cantidad_vendida
    this.model.cantidad_en_bodega = this.loteReal.data.cantidad_en_bodega
    this.cantidad_afectada_por_merma = this.loteReal.data.mermas
    this.model.estado = this.loteReal.data.estado
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

  formatoFecha(fecha: number) {
    const date = new Date(Number(fecha) * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
  }

  checkValidation(): boolean {
    let respuesta = false
    const regexBarCode = /^[0-9]{13}$/;
    const regexNIT = /^[0-9]{8,15}$/;
    this.validators.codigo_barra = (this.producto.codigo_barra === null || !regexBarCode.test((this.producto.codigo_barra as any).toString()))
    this.validators.nit = (this.proveedor.nit === null || !regexNIT.test((this.proveedor.nit as any).toString()));

    this.validators.id_producto = (this.model.id_producto === null || !regexBarCode.test((this.producto.codigo_barra as any).toString()));
    this.validators.id_proveedor = (this.model.id_proveedor === null || !regexNIT.test((this.proveedor.nit as any).toString()));
    this.validators.lote = (this.model.lote === '');
    this.validators.fecha_entrada = (this.model.fecha_entrada === '');
    this.validators.fecha_vencimiento = (this.model.fecha_vencimiento === '');
    this.validators.cantidad_comprada = true;
    this.validators.estado = (this.model.estado === '');

    if (this.validators.codigo_barra) {
      this.btn_new_product = false
      this.form_new_provider = false
      this.form_new_batch = false
      this.show_detail_product = false
      if (this.proveedor.nit != '') {
        this.show_detail_provider = true
      } else {
        this.show_detail_provider = false
      }
    }

    if (this.validators.nit) {
      if (this.proveedor.nit != '') {
        this.show_detail_provider = false
      } else {
        this.show_detail_provider = false
      }
    }

    if (this.validators.cantidad_comprada) {
      this.validators.cantidad_comprada = false
      this.validators.menor_a_merma_mas_vendida = false
      if(this.model.cantidad_comprada > this.loteReal.data.cantidad_comprada){
        this.model.cantidad_en_bodega = parseInt(this.model.cantidad_comprada) - (parseInt(this.loteReal.data.mermas) + parseInt(this.loteReal.data.cantidad_vendida))
      }
      if(this.model.cantidad_comprada < this.loteReal.data.cantidad_comprada){
        let cantidad_mermas_vendida  = parseInt(this.loteReal.data.mermas) + parseInt(this.model.cantidad_vendida)
        if(parseInt(this.model.cantidad_comprada) >= cantidad_mermas_vendida){
          this.model.cantidad_en_bodega = parseInt(this.model.cantidad_comprada) - cantidad_mermas_vendida
        }else{
          this.validators.menor_a_merma_mas_vendida = true
        }
      }
    }

    const boton = document.querySelector('.btnUpdate') as HTMLButtonElement

    if (this.producto.es_perecedero == '1') {
      (!this.validators.id_producto && !this.validators.id_proveedor && !this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.estado && !this.validators.fecha_vencimiento && !this.validators.menor_a_merma_mas_vendida) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      respuesta = !this.validators.id_producto && !this.validators.id_proveedor && !this.validators.lote && !this.validators.fecha_entrada && !this.validators.fecha_vencimiento && !this.validators.cantidad_comprada && !this.validators.estado && !this.validators.fecha_vencimiento && !this.validators.menor_a_merma_mas_vendida
    }
    
    if (this.producto.es_perecedero == '0') {
      (!this.validators.id_producto && !this.validators.id_proveedor && !this.validators.lote && !this.validators.fecha_entrada && !this.validators.cantidad_comprada && !this.validators.estado && !this.validators.menor_a_merma_mas_vendida) ? boton.classList.remove('disabled') : boton.classList.add('disabled')
      respuesta = !this.validators.id_producto && !this.validators.id_proveedor && !this.validators.lote && !this.validators.fecha_entrada && !this.validators.cantidad_comprada && !this.validators.estado && !this.validators.menor_a_merma_mas_vendida
    }

    return respuesta
  }

  get esCodigoValido(): boolean {
    const codigo = (this.producto?.codigo_barra || '').toString();
    const regex = /^\d{13}$/;
    return regex.test(codigo);
  }

  get longitudCodigo(): number {
    return (this.producto?.codigo_barra || '').toString().length;
  }

  async buscarProducto() {
    try {
      const response = await this.productoService.getDataProductForBarcode(this.producto.codigo_barra);
      if (response.status === 200) {
        this.model.id_producto = response.data.id
        this.producto.nombre = response.data.nombre
        this.producto.marca = response.data.marca.nombre
        this.producto.unidad_medida = response.data.medida.nombre
        this.producto.es_perecedero = response.data.es_perecedero
        const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
        // boton.classList.add('disabled')
        this.show_detail_product = true
        this.btn_new_product = false
        this.form_new_provider = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
          // boton.classList.add('disabled')
          this.show_detail_product = false
          this.btn_new_product = true
          if (this.permisos_catalogo_productos.find(obj => obj.permiso_permiso === 'crear') == undefined) {
            this.puedoCrearProductos = false
          } else {
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
        const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
        // boton.classList.add('disabled')
        this.show_detail_provider = true
        this.btn_new_provider = false
        this.form_new_batch = true
      }
    } catch (error: any) {
      if (error.response) {
        const statusCode = error.response.status;
        if (statusCode === 404) {
          this.show_detail_provider = false
          this.btn_new_provider = true
          this.form_new_batch = false
          if (this.permisos_catalogo_proveedores.find(obj => obj.permiso_permiso === 'crear') == undefined) {
            this.puedoCrearProveedores = false
          } else {
            this.puedoCrearProveedores = true
          }
          const boton = document.querySelector('.btnUpdate') as HTMLButtonElement
          // boton.classList.add('disabled')
        }
      } else {
        console.error('Error de red o servidor no disponible');
      }
    }
  }

  async actualizarData() {
    if (this.isFormValid) {
      try {
        await this.bodegaService.updateBatch(this.model, this.route.snapshot.queryParams?.['id_lote']);
        ocultarModalOscura();

        Swal.fire({
          title: this.translate.instant('mod-catalog.PRODUCT.SWAL_UPDATED'),
          text: this.translate.instant('mod-catalog.SWAL_UPDATED_RECORD'),
          icon: "success"
        });
      } catch (error: any) {
        const msg = error.response?.data?.message;
        Swal.fire('Error', Array.isArray(msg) ? msg[0] : msg, 'error');
      }
    }
  }

  mostrarSeccion = {
    productSeccion: true,
    providerSeccion: true,
    batchSeccion: true,
    mermaSeccion: true,
  }

  toogleSection(sectionActive: string) {
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }
}
