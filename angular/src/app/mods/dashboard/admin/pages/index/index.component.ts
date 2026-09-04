import { Component, ViewChild } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';
import { Scanner13Component } from '@component/globales/scanner13/scanner13.component';
import { FiltroLoteComponent } from '../../components/filtro/filtro.component';
import { CommonModule } from '@angular/common';
import { RangosFiltroComponent } from '../../components/rangos/rangos.component';

import { ChartsComponent } from '@component/globales/charts/charts.component';
import { ChartOptions, ChartType, ChartData } from 'chart.js';
import { ToogleBatchComponent } from '../../components/toogle-batch/toogle-batch.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
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
      lote: null
    }
  }

  idProducto: any = null

  mostrarSeccion = {
    graficosGenerales: true,
    resultadosBusqueda: true,
    resultadosGraficosBusqueda: true,
  }

  showDetailProduct = false

  clearData(data: any){
    this.showDetailProduct = false
    if(this.hijoComponente){
      this.hijoComponente.limpiarCampo()
    }
  }

  productScanned(data: any) {
    this.idProducto = (data && data.id) ? data.id : null

    if (data) {
      this.datosJson.producto.codigo_barra = data.codigo_barra || null;
      this.datosJson.producto.nombre = data.nombre || null;
      this.datosJson.producto.marca = data.marca || null;
      this.datosJson.producto.unidad_medida = data.unidad_medida || null;
    }
  }

  loteTyped(data: any) {
    if (data !== undefined && data !== null) {
      this.showDetailProduct = true;

      if (data.proveedor) {
        this.datosJson.proveedor.nit = data.proveedor.nit || null;
        this.datosJson.proveedor.correo = data.proveedor.correo || null;
        this.datosJson.proveedor.razon_social = data.proveedor.razon_social || null;
      }

      if (data.lote) {
        this.datosJson.lote.cantidad_afectada_por_merma = data.lote.cantidad_afectada_por_merma || null;
        this.datosJson.lote.cantidad_comprada = data.lote.cantidad_comprada || null;
        this.datosJson.lote.cantidad_en_bodega = data.lote.cantidad_en_bodega || null;
        this.datosJson.lote.cantidad_vendida = data.lote.cantidad_vendida || null;
        this.datosJson.lote.estado = data.lote.estado || null;
        this.datosJson.lote.fecha_entrada = data.lote.fecha_entrada || null;
        this.datosJson.lote.fecha_vencimiento = data.lote.fecha_vencimiento || null;
        this.datosJson.lote.lote = data.lote.lote || null;
        this.datosJson.lote.id = data.lote.id || null;
      }

      console.log(this.datosJson)

    } else {
      this.showDetailProduct = false
    }
  }

  toogleSection(sectionActive: string) {
    if (sectionActive in this.mostrarSeccion) {
      const key = sectionActive as keyof typeof this.mostrarSeccion;
      this.mostrarSeccion[key] = !this.mostrarSeccion[key];
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
