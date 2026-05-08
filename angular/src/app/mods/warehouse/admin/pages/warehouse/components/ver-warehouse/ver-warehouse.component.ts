import { Component } from '@angular/core';
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
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

interface LoteInterface {
  'id': number,
  'lote': string,
  'fecha_entrada': number,
  'fecha_vencimiento': number | string,
  'cantidad_comprada': number,
  'cantidad_vendida': number,
  'cantidad_afectada_por_merma': number,
  'stock': number,
  'costo_unitario': number,
  'precio_venta_sugerido': number,
  'estado': string
}

@Component({
  selector: 'app-ver-warehouse',
  standalone: true,
  imports: [
    TranslateModule, 
    FormsModule,
    LoadingComponent,
    TablecrudComponent
  ],
  templateUrl: './ver-warehouse.component.html',
  styleUrl: './ver-warehouse.component.scss',
})
export class VerWarehouseComponent {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService :AuthService,
    private bodegaService: BodegaService,
    private translate: TranslateService
  ){ }
  
  id_lote = ''
  lote: LoteInterface[] = []
  permisos: any[] = []
  loteReal: any

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
    cantidad_vendida: '',
    cantidad_afectada_por_merma: '',
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

  formatoFecha(fecha: number){
    const date = new Date(Number(fecha) * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${mm}/${dd}/${yyyy}`
  }

  cargarIdioma = true
  endPoint = `registro-mermas/obtener-registro-mermas?id_lote=${this.id_lote}`
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
      data: 'observaciones',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_TYPE'),
      data: 'id_tipo_merma',
      className: 'text-center'
    },
  ];
  titlePage = ''

  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    this.id_lote = this.route.snapshot.queryParams?.['id_lote']
    this.loteReal = await this.bodegaService.getDataLote(this.route.snapshot.queryParams?.['id_lote'])

    this.producto.nombre = this.loteReal.data.id_producto.nombre
    this.producto.marca = this.loteReal.data.id_producto.marca.nombre
    this.producto.unidad_medida = this.loteReal.data.id_producto.unidad_medida
    this.producto.es_perecedero = this.loteReal.data.id_producto.es_perecedero

    this.proveedor.nit = this.loteReal.data.id_proveedor.nit
    this.proveedor.razon_social = this.loteReal.data.id_proveedor.razon_social
    this.proveedor.correo = this.loteReal.data.id_proveedor.correo

    this.model.id_producto = ''
    this.model.id_proveedor = ''
    this.model.codigo_barra = this.loteReal.data.id_producto.codigo_barra
    this.model.lote = this.loteReal.data.lote
    this.model.fecha_entrada = this.formatoFecha(this.loteReal.data.fecha_entrada) 
    this.model.fecha_vencimiento = this.formatoFecha(this.loteReal.data.fecha_vencimiento)  
    this.model.cantidad_comprada = this.loteReal.data.cantidad_comprada
    this.model.cantidad_vendida = this.loteReal.data.cantidad_vendida
    this.model.cantidad_afectada_por_merma = this.loteReal.data.mermas
    this.model.estado = this.loteReal.data.estado
  }

}
