import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';
import { Scanner13Component } from '@component/globales/scanner13/scanner13.component';
import { FiltroLoteComponent } from '../../components/filtro-lote/filtro-lote.component';
import { CommonModule } from '@angular/common';
// import { RangosFiltroComponent } from '../../components/rangos/rangos.component';
import { TranslateModule } from '@ngx-translate/core';

import { ChartsComponent } from '@component/globales/charts/charts.component';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ToogleBatchComponent } from '../../components/toogle-batch/toogle-batch.component';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    TranslateModule,
    ReporteWarehouseComponent,
    Scanner13Component,
    FiltroLoteComponent,
    ToogleBatchComponent,
    // RangosFiltroComponent,
    CommonModule,

    ChartsComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class AdminDashboardComponent implements OnInit {

  constructor(
    private bodegaService: BodegaService,
    private productosService: ProductosService
  ) {
  }

  isSmallScreen: boolean = false;
  showRequestBatch: boolean = false;

  ngOnInit() {
    this.checkScreenSize();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isSmallScreen = window.innerWidth < 1024;
  }

  @ViewChild('hijoFiltro') hijoComponente!: FiltroLoteComponent;

  datosJson: any = {
    producto: {
      show: false,
      codigo_barra: null,
      nombre: null,
      marca: null,
      unidad_medida: null
    },
    proveedor: {
      show: false,
      nit: null,
      correo: null,
      razon_social: null
    },
    lote: {
      show: false,
      cantidad_afectada_por_merma: null,
      cantidad_comprada: null,
      cantidad_en_bodega: null,
      cantidad_vendida: null,
      estado: null,
      fecha_entrada: null,
      fecha_vencimiento: null,
      lote: null,
      id: null
    }
  }

  idProducto: any = null
  loteDigitado: any = ''
  showDetailProduct = false

  mostrarSeccion = {
    graficosGenerales: true,
    resultadosBusqueda: true,
    resultadosGraficosBusqueda: true,
  }

  clearData(data: any) {
    this.showDetailProduct = false
    if (this.hijoComponente) {
      this.hijoComponente.limpiarCampo()
    }
  }

  isFormValid = true
  productScanned(data: any) {
    this.idProducto = (data && data.id) ? data.id : null

    if (data.id) {
      this.datosJson.producto.codigo_barra = data.codigo_barra || null;
      this.datosJson.producto.nombre = data.nombre || null;
      this.datosJson.producto.marca = data.marca || null;
      this.datosJson.producto.unidad_medida = data.unidad_medida || null;

      this.validarBotonFiltro()
    } else {
      this.validarBotonFiltro()
    }

  }

  showInputBatch(tiene_lote: boolean) {
    this.showRequestBatch = tiene_lote

    this.loteDigitado = (this.showRequestBatch) ? this.loteDigitado : ''

    this.validarBotonFiltro()
  }

  loteTyped(data: any) {
    this.loteDigitado = data
    this.validarBotonFiltro()
  }

  validarBotonFiltro() {
    // no tiene producto
    if (this.idProducto == null) {
      console.log('caso 1')
      this.isFormValid = true
    }

    // tiene producto y no tiene lote
    if (this.showRequestBatch == false && this.idProducto != null && this.loteDigitado == '') {
      console.log('caso 2')
      this.isFormValid = false
    }

    // tiene producto y tiene lote y esta digitado
    if (this.showRequestBatch == true && this.idProducto != null && this.loteDigitado != '') {
      console.log('caso 3')
      this.isFormValid = false
    }

    // tiene producto y tiene lote y no esta digitado
    if (this.showRequestBatch == true && this.idProducto != null && this.loteDigitado == '') {
      console.log('caso 4')
      this.isFormValid = true
    }
  }

  toogleSection(sectionActive: string) {
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
    }
  }

  async filtrarLote() {
    if (this.showRequestBatch) {
      try {
        const response = await this.bodegaService.getDataLoteAndProduct(this.loteDigitado, this.idProducto);
        console.log(response)
        if (response.status === 200) {
          this.datosJson.proveedor = {
            show: true,
            nit: response.data.id_proveedor.nit,
            razon_social: response.data.id_proveedor.razon_social,
            correo: response.data.id_proveedor.correo
          };

          this.datosJson.lote = {
            show: true,
            id: response.data.id,
            lote: response.data.lote,
            fecha_entrada: response.data.fecha_entrada,
            fecha_vencimiento: response.data.fecha_vencimiento,
            cantidad_comprada: response.data.cantidad_comprada,
            cantidad_vendida: response.data.cantidad_vendida,
            cantidad_en_bodega: response.data.cantidad_en_bodega,
            cantidad_afectada_por_merma: response.data.mermas,
            estado: response.data.estado
          };

          this.datosJson.producto = {
            show: true,
            codigo_barra: response.data.id_producto.codigo_barra,
            nombre: response.data.id_producto.nombre,
            marca: response.data.id_producto.marca.nombre,
            unidad_medida: response.data.id_producto.medida.nombre
          };

          // Forzar la creación de un nuevo objeto para disparar ngOnChanges por referencia
          this.datosJson = { ...this.datosJson };

          if (response.data.infoGraphics) {
            this.actualizarGraficas(response.data.infoGraphics);
          }

          this.showDetailProduct = true;
        }
      } catch (error: any) {
        this.showDetailProduct = false;
      }
    } else {
      if (this.idProducto && this.loteDigitado == '') {
        try {
          const response = await this.productosService.getDataProduct(this.idProducto);
          console.log(response)
          if (response.status === 200) {
            // Resetear proveedor y lote para que el hijo detecte el cambio de estado
            this.datosJson.proveedor = { show: false, nit: null, correo: null, razon_social: null };
            this.datosJson.lote = { show: false, cantidad_afectada_por_merma: null, cantidad_comprada: null, cantidad_en_bodega: null, cantidad_vendida: null, estado: null, fecha_entrada: null, fecha_vencimiento: null, lote: null, id: null };

            // Asignar producto
            this.datosJson.producto = {
              show: true,
              codigo_barra: response.data.prodcut.codigo_barra,
              nombre: response.data.prodcut.nombre,
              marca: response.data.prodcut.marca.nombre,
              unidad_medida: response.data.prodcut.medida.nombre
            };

            // Forzar la creación de un nuevo objeto para disparar ngOnChanges por referencia
            this.datosJson = { ...this.datosJson };

            if (response.data.infoGraphics) {
              this.actualizarGraficas(response.data.infoGraphics);
            }

            this.showDetailProduct = true;
          }
        } catch (error: any) {
          this.showDetailProduct = false;
        }
      }
    }
  }


  private actualizarGraficas(infoGraphics: any) {
    if (!infoGraphics) return;

    if (infoGraphics.resumen) {
      const resumen = infoGraphics.resumen;

      const cantidadVendida = Number(resumen.cantidad_vendida) || 0;
      const cantidadBodega = Number(resumen.cantidad_en_bodega) || 0;
      const cantidadAfectada = Number(resumen.cantidad_afectada) || 0;
      const cantidadComprada = Number(resumen.cantidad_comprada) || 0;

      this.pieChartData = {
        labels: ['Cantidad vendida', 'Cantidad en Bodega', 'Cantidad afectada por merma', 'Cantidad comprada'],
        datasets: [{
          data: [cantidadVendida, cantidadBodega, cantidadAfectada, cantidadComprada],
          backgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384', '#FFCE56'],
          hoverBackgroundColor: ['#36A2EB', '#4BC0C0', '#FF6384', '#FFCE56']
        }]
      };
    }

    if (infoGraphics.mermasDias) {
      const coloresDias = [
        '#36A2EB', // Lunes
        '#FF6384', // Martes
        '#FFCE56', // Miércoles
        '#4BC0C0', // Jueves
        '#9966FF', // Viernes
        '#FF9F40', // Sábado
        '#C9CBCF'  // Domingo
      ];

      const datasetsBarras = infoGraphics.mermasDias.map((item: any, index: number) => {
        return {
          label: item.dia_semana,
          data: [Number(item.cantidad_mermada) || 0],
          backgroundColor: coloresDias[index % coloresDias.length],
          borderColor: coloresDias[index % coloresDias.length],
          borderWidth: 1,
          borderRadius: 4,
          hidden: false // Garantiza que empiece visible
        };
      });

      this.barChartData = {
        labels: ['Días de la semana'], // Una sola categoría horizontal
        datasets: datasetsBarras
      };
    }

    if (infoGraphics.mermasCantidad) {
      const labelsMermas = infoGraphics.mermasCantidad.map((item: any) => item.nombre);
      const dataMermas = infoGraphics.mermasCantidad.map((item: any) => Number(item.cantidad_por_merma) || 0);

      this.mermasCantidadChartData = {
        labels: labelsMermas,
        datasets: [
          {
            data: dataMermas,
            label: 'Cantidad por merma',
            backgroundColor: '#FF6384',
            borderColor: '#E55373',
            borderWidth: 1,
            borderRadius: 4
          }
        ]
      };
    }

    if (infoGraphics.mermasDias) {
      const labelsDias = infoGraphics.mermasDias.map((item: any) => item.dia_semana);
      const dataPorcentajes = infoGraphics.mermasDias.map((item: any) => {
        if (!item.porcentaje_merma) return 0;
        const valorLimpio = item.porcentaje_merma.toString().replace('%', '').replace(',', '.').trim();
        return parseFloat(valorLimpio) || 0;
      });

      // Se asigna forzando la creación de un nuevo objeto e incluyendo la propiedad label en el dataset
      this.piePorcentajeChartData = {
        labels: [...labelsDias],
        datasets: [{
          label: 'Porcentaje de merma',
          data: [...dataPorcentajes],
          backgroundColor: [
            '#36A2EB',
            '#FF6384',
            '#FFCE56',
            '#4BC0C0',
            '#9966FF',
            '#FF9F40',
            '#C9CBCF'
          ]
        }]
      };
    }
  }


  // ==========================
  // 1. CONFIGURACIÓN BARRAS
  // ==========================
  public barChartType: ChartType = 'bar';
  public barChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top',
        onClick: (e, legendItem, legend) => {
          const index = legendItem.datasetIndex;
          if (index !== undefined) {
            const chart = legend.chart;
            const dataset = chart.data.datasets[index];

            // 1. Cambiamos el estado hidden del dataset directamente
            dataset.hidden = !dataset.hidden;

            // 2. Sincronizamos la metadata visual
            const meta = chart.getDatasetMeta(index);
            meta.hidden = dataset.hidden;

            // 3. Forzamos el renderizado y recálculo de ejes
            chart.update();
          }
        }
      },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        grid: { display: false }
      },
      y: {
        type: 'logarithmic',
        min: 1, // <--- CAMBIO AQUÍ: Reemplaza beginAtZero y grace. Define la base del eje Y en 1.
        ticks: {
          callback: (value) => Number(value).toLocaleString()
        }
      }
    }
  };

  public barChartData: ChartData<'bar'> = {
    labels: [],
    datasets: []
  };

  // ==========================
  // 2. CONFIGURACIÓN LÍNEAS
  // ==========================
  public lineChartType: ChartType = 'line';
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };
  public lineChartData: ChartData<'line'> = {
    labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4', 'Semana 5'],
    datasets: [
      {
        data: [120, 150, 180, 140, 220],
        label: 'Tráfico Web',
        fill: true,
        tension: 0.4,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: '#36A2EB',
        pointBackgroundColor: '#36A2EB',
      },
      {
        data: [80, 110, 130, 95, 170],
        label: 'Conversiones',
        fill: false,
        tension: 0.4,
        borderColor: '#FF6384',
        pointBackgroundColor: '#FF6384',
      }
    ]
  };

  // ==========================
  // 3. CONFIGURACIÓN PASTEL
  // ==========================
  public pieChartType: ChartType = 'pie';
  public pieChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    aspectRatio: 2,
    plugins: {
      legend: { position: 'top' },
      tooltip: { enabled: true }
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'],
    datasets: [{
      data: [300, 500, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
    }]
  };

  // ==========================
  // CONFIGURACIÓN MERMAS POR CANTIDAD (BARRAS HORIZONTALES)
  // ==========================
  public mermasCantidadChartType: ChartType = 'bar';
  public mermasCantidadChartOptions: ChartOptions<'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y', // Barras horizontales para acomodar nombres largos de mermas
    plugins: {
      legend: { display: false },
      tooltip: { enabled: true }
    },
    scales: {
      x: {
        beginAtZero: true,
        title: { display: true, text: 'Cantidad' }
      }
    }
  };
  public mermasCantidadChartData: ChartData<'bar', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      label: 'Cantidad por merma',
      backgroundColor: '#FF6384',
      borderColor: '#E55373',
      borderWidth: 1,
      borderRadius: 4
    }]
  };


  // ==========================
  // CONFIGURACIÓN PORCENTAJE MERMA POR DÍA (PASTEL)
  // ==========================
  public piePorcentajeChartType: ChartType = 'pie';

  public piePorcentajeChartOptions: ChartOptions<'pie'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const label = context.label || '';
            const value = context.formattedValue || context.raw || 0;
            return ` ${label}: ${value}%`;
          }
        }
      }
    }
  };

  public piePorcentajeChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [{
      data: [],
      backgroundColor: [
        '#36A2EB', // Lunes
        '#FF6384', // Martes
        '#FFCE56', // Miércoles
        '#4BC0C0', // Jueves
        '#9966FF', // Viernes
        '#FF9F40', // Sábado
        '#C9CBCF'  // Domingo
      ]
    }]
  };

}
