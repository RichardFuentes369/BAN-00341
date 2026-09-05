import { Component, ViewChild } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';
import { Scanner13Component } from '@component/globales/scanner13/scanner13.component';
import { FiltroLoteComponent } from '../../components/filtro-lote/filtro-lote.component';
import { CommonModule } from '@angular/common';
import { RangosFiltroComponent } from '../../components/rangos/rangos.component';
import { TranslateModule } from '@ngx-translate/core';

import { ChartsComponent } from '@component/globales/charts/charts.component';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ToogleBatchComponent } from '../../components/toogle-batch/toogle-batch.component';
import { BodegaService } from '@mod/warehouse/admin/pages/warehouse/service/warehouse.service';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    TranslateModule,
    ReporteWarehouseComponent,
    Scanner13Component,
    FiltroLoteComponent,
    ToogleBatchComponent,
    RangosFiltroComponent,
    CommonModule,

    ChartsComponent,
  ],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss',
})
export class AdminDashboardComponent {

  constructor(
    private bodegaService: BodegaService
  ) {
  }

  @ViewChild('hijoFiltro') hijoComponente!: FiltroLoteComponent;

  datosJson: any = {
    producto: {
      codigo_barra: null,
      nombre: null,
      marca: null,
      unidad_medida: null
    },
    proveedor: {
      nit: null,
      correo: null,
      razon_social: null
    },
    lote: {
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

  showRequestBatch = false
  showInputBatch(tiene_lote: boolean) {
    this.showRequestBatch = tiene_lote
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
    try {
      const response = await this.bodegaService.getDataLoteAndProduct(this.loteDigitado, this.idProducto);
      if (response.status === 200) {
        this.datosJson.proveedor.nit = response.data.id_proveedor.nit
        this.datosJson.proveedor.razon_social = response.data.id_proveedor.razon_social
        this.datosJson.proveedor.correo = response.data.id_proveedor.correo

        this.datosJson.lote.id = response.data.id
        this.datosJson.lote.lote = response.data.lote
        this.datosJson.lote.fecha_entrada = response.data.fecha_entrada
        this.datosJson.lote.fecha_vencimiento = response.data.fecha_vencimiento
        this.datosJson.lote.cantidad_comprada = response.data.cantidad_comprada
        this.datosJson.lote.cantidad_vendida = response.data.cantidad_vendida
        this.datosJson.lote.cantidad_en_bodega = response.data.cantidad_en_bodega
        this.datosJson.lote.cantidad_afectada_por_merma = response.data.mermas
        this.datosJson.lote.estado = response.data.estado

        this.datosJson.producto.codigo_barra = response.data.id_producto.codigo_barra
        this.datosJson.producto.nombre = response.data.id_producto.nombre
        this.datosJson.producto.marca = response.data.id_producto.marca.nombre
        this.datosJson.producto.unidad_medida = response.data.id_producto.medida.nombre

        this.showDetailProduct = true
      }
    } catch (error: any) {
      this.showDetailProduct = false
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
      legend: { display: true, position: 'top' },
      tooltip: { enabled: true }
    },
    scales: {
      x: {},
      y: { beginAtZero: true }
    }
  };
  public barChartData: ChartData<'bar'> = {
    labels: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo'],
    datasets: [
      {
        data: [65, 59, 80, 81, 56],
        label: 'Ventas 2026',
        backgroundColor: '#36A2EB',
        borderColor: '#2A82BE',
        borderWidth: 1
      },
      {
        data: [28, 48, 40, 19, 86],
        label: 'Gastos 2026',
        backgroundColor: '#FF6384',
        borderColor: '#CC4F6A',
        borderWidth: 1
      }
    ]
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

}
