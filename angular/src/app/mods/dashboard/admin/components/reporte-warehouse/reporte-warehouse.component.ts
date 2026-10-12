import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-warehouse',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule, TablecrudComponent],
  templateUrl: './reporte-warehouse.component.html',
  styleUrl: './reporte-warehouse.component.scss',
})
export class ReporteWarehouseComponent implements OnChanges {

  constructor(
    private translate: TranslateService
  ) { }

  // Recibe el JSON completo del padre
  @Input() datosRecibidos: any;

  endPointV = ''
  endPointM = ''
  cargarIdioma = true
  accioneson = false
  orderField = 'id'
  order = 'desc'
  columnasM: any[] = [
    {
      title: this.translate.instant('mod-merma.REGISTER.COLUMN_ID'),
      data: 'id',
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
    batchSeccion: true,
    providerSeccion: true,
    registerSeccion: true,
    ventaSeccion: true,
    mermaSeccion: true
  };

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
}