import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChartsComponent } from '@component/globales/charts/charts.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ChartOptions, ChartType, ChartData } from 'chart.js';

@Component({
  selector: 'app-reporte-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule, TablecrudComponent, ChartsComponent],
  templateUrl: './reporte-warehouse.component.html',
  styleUrl: './reporte-warehouse.component.scss',
})
export class ReporteWarehouseComponent implements OnChanges {

  constructor(
    private translate: TranslateService
  ) { }

  // Recibe el JSON completo del padre
  @Input() datosRecibidos: any;

  endPointB = ''
  endPointV = ''
  endPointM = ''
  cargarIdioma = true
  accioneson = false
  orderField = 'id'
  order = 'desc'
  columnasB: any[] = [
    {
      title: `<i class="fas fa-hashtag me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_ID')}`,
      data: 'id',
      visible: true,
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-barcode me-1"></i>${this.translate.instant('mod-catalog.PRODUCT.LABEL_COD_BAR_PRODUCT')}`,
      data: 'id_producto.codigo_barra',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fa fa-layer-group me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_BATCH')}`,
      data: 'lote',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-copyright me-1"></i>${this.translate.instant('mod-catalog.PRODUCT.COLUMN_BRAND')}`,
      data: 'id_producto.marca.nombre',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-box-open me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_PRODUCT')}`,
      data: 'id_producto.nombre',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-truck me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_SUPPLIER')}`,
      data: 'id_proveedor.razon_social',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-calendar-alt me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_REPORT_DATE')}`,
      data: 'fecha_entrada',
      className: 'text-center align-middle',
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
      title: `<i class="fas fa-calendar-times me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_EXPIRATION_DATE')}`,
      data: 'fecha_vencimiento',
      className: 'text-center align-middle',
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
      title: `<i class="fas fa-shopping-cart me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_PURCHASED')}`,
      data: 'cantidad_comprada',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fa fa-shopping-bag me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_SOLD')}`,
      data: 'cantidad_vendida',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-exclamation-triangle me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_SHRINKAGE')}`,
      data: 'mermas',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-warehouse me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_IN_STOCK')}`,
      data: 'cantidad_en_bodega',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fa fa-ruler-combined me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_UNIT_OF_MEASUREMENT')}`,
      visible: false,
      data: 'id_producto.medida.nombre',
      className: 'text-center align-middle'
    },
    {
      title: `<i class="fas fa-info-circle me-1"></i>${this.translate.instant('mod-warehouse.COLUMN_STATUS')}`,
      visible: false,
      data: 'estado',
      className: 'text-center align-middle'
    },
  ];
  columnasM: any[] = [
    {
      title: `<i class="fas fa-hashtag me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_ID')}`,
      data: 'id',
      className: 'text-center'
    },
    {
      title: `<i class="fas fa-sort-numeric-up me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_AMOUNT')}`,
      data: 'cantidad',
      className: 'text-center'
    },
    {
      title: `<i class="fas fa-calendar-alt me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_REPORT_DATE')}`,
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
      title: `<i class="fas fa-dollar-sign me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_LOST_VALUE')}`,
      data: 'valor_perdido',
      className: 'text-center'
    },
    {
      title: `<i class="fas fa-comment-alt me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_OBSERVATION')}`,
      data: 'observacion',
      className: 'text-center'
    },
    {
      title: `<i class="fas fa-tags me-1"></i>${this.translate.instant('mod-merma.REGISTER.COLUMN_TYPE')}`,
      data: 'id_tipo_merma.nombre',
      className: 'text-center'
    },
  ];
  columnasV: any[] = [
    {
      title: this.translate.instant('mod-salereturn.COLUMN_INVOICE'),
      data: 'id_venta.nro_factura',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-salereturn.COLUMN_DATE_SALE'),
      data: 'id_venta.fecha_venta',
      className: 'text-center align-middle',
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
      title: this.translate.instant('mod-catalog.PRODUCT.COLUMN_BAR_CODE'),
      data: 'codigo_barra',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
      data: 'lote',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-catalog.WORD_QUANTITY'),
      data: 'cantidad',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-salereturn.WORD_VLR_UNITARIO'),
      data: 'valor_unitario',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-salereturn.WORD_VLR_TOTAL'),
      data: 'valor_total',
      className: 'text-center'
    },
  ]
  titlePage = this.translate.instant('mod-warehouse.TABLE_TITLE')

  // Banderas de visualización de detalles
  show_detail_product: boolean = false;
  show_detail_batch: boolean = false;

  // Objetos locales inicializados para que el HTML no falle en los ngModel
  producto: any = {
    codigo_barra: '',
    nombre: '',
    marca: '',
    unidad_medida: '',
    es_perecedero: false
  };

  proveedor: any = {
    nit: '',
    razon_social: '',
    correo: ''
  };

  bodega: any = {
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: 0,
    cantidad_vendida: 0,
    cantidad_en_bodega: 0,
    cantidad_afectada_por_merma: 0,
    estado: '',
  };

  mostrarSeccion = {
    productSeccion: true,
    bodegaSeccion: false,
    batchSeccion: false,
    providerSeccion: false,
    registerSeccion: false,
    ventaSeccion: false,
    mermaSeccion: false,
    graficaSeccion: true
  };

  @ViewChild('tableB') tableComponent0!: TablecrudComponent;
  @ViewChild('tableV') tableComponent1!: TablecrudComponent;
  @ViewChild('tableM') tableComponent2!: TablecrudComponent;

  // Detecta cuando el padre actualiza el JSON con los datos escaneados o del lote
  ngOnChanges(changes: SimpleChanges) {
    if (changes['datosRecibidos'] && this.datosRecibidos) {
      // 1. Mapear Producto si viene con datos
      if (this.datosRecibidos.producto) {
        this.producto = { ...this.datosRecibidos.producto };
        // Si hay código de barra o nombre, mostramos la sección de detalle del producto
        this.show_detail_product = !!(this.producto.codigo_barra || this.producto.nombre);

        if (this.producto.codigo_barra) {
          // &fecha_venta_minimo=${this.datosRecibidos.filtro.fecha_inicio}&fecha_venta_maximo=${this.datosRecibidos.filtro.fecha_fin}
          this.endPointB = `batch/obtener-registro-lotes?codigo_barra=${this.datosRecibidos.producto.codigo_barra}`
          setTimeout(() => {
            this.tableComponent0?.reload();
          }, 100);
        } else {
          this.endPointB = ''
        }
      }

      // 2. Mapear Proveedor si viene con datos
      if (this.datosRecibidos.proveedor) {
        this.proveedor = { ...this.datosRecibidos.proveedor };
      }

      // 3. Mapear Lote / Bodega si viene con datos
      if (this.datosRecibidos.lote) {
        this.bodega.show = this.datosRecibidos.lote.show
        this.bodega.lote = this.datosRecibidos.lote.lote
        this.bodega.fecha_entrada = this.formatoFecha(this.datosRecibidos.lote.fecha_entrada)
        this.bodega.fecha_vencimiento = this.formatoFecha(this.datosRecibidos.lote.fecha_vencimiento)
        this.bodega.cantidad_comprada = this.datosRecibidos.lote.cantidad_comprada
        this.bodega.cantidad_vendida = this.datosRecibidos.lote.cantidad_vendida
        this.bodega.cantidad_en_bodega = this.datosRecibidos.lote.cantidad_en_bodega
        this.bodega.cantidad_afectada_por_merma = this.datosRecibidos.lote.cantidad_afectada_por_merma
        this.bodega.estado = this.datosRecibidos.lote.estado
        // Si hay lote, mostramos el detalle del lote
        this.show_detail_batch = !!this.bodega.lote;
      }

      if (this.datosRecibidos.infoGraphics) {
        const info = this.datosRecibidos.infoGraphics;

        const rawVentas = info.valorVentasCBL?.[0]?.total_valor_ventas ?? 0;
        const rawPerdido = info.valorPerdidoCBL?.[0]?.total_valor_perdido ?? 0;
        
        const valorVentas = Number(rawVentas) || 0;
        const valorPerdido = Number(rawPerdido) || 0;

        this.pieComparativaChartData = {
          labels: ['Valor Ventas (CBL)', 'Valor Perdido (CBL)'],
          datasets: [{
            data: [valorVentas, valorPerdido],
            backgroundColor: ['#4BC0C0', '#FF6384'],
            hoverBackgroundColor: ['#36A2EB', '#FF6384']
          }]
        };
      }

      // 5. Cargar la tabla de mermas
      if (this.datosRecibidos.lote.show) {
        this.endPointV = `sales/obtener-detalle-ventas?lote=${this.datosRecibidos.lote.lote}&codigo_barra=${this.datosRecibidos.producto.codigo_barra}&fecha_venta_minimo=${this.datosRecibidos.filtro.fecha_inicio}&fecha_venta_maximo=${this.datosRecibidos.filtro.fecha_fin}`
        this.endPointM = `registro-mermas/obtener-registro-mermas?id_lote=${this.datosRecibidos.lote.id}&fecha_reporte_minimo=${this.datosRecibidos.filtro.fecha_inicio}&fecha_reporte_maximo=${this.datosRecibidos.filtro.fecha_fin}`

        setTimeout(() => {
          this.tableComponent1?.reload();
          this.tableComponent2?.reload();
        }, 100);
      } else {
        this.endPointV = ''
        this.endPointM = ''
      }
    }
  }

  toogleSection(sectionActive: string) {
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }

  formatoFecha(fecha: number) {
    const date = new Date(Number(fecha) * 1000);
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');

    return `${yyyy}-${mm}-${dd}`
  }

  // Configuración de la Gráfica de Comparativa
  public pieComparativaChartType: ChartType = 'pie';
  public pieComparativaChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: { position: 'top' },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.parsed || 0;
            return ` ${label}: $ ${value.toLocaleString()}`;
          }
        }
      }
    }
  };
  public pieComparativaChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [],
      hoverBackgroundColor: []
    }]
  };
}