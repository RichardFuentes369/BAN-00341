import { Component, ViewChild } from '@angular/core';
import { ReporteWarehouseComponent } from '../../components/reporte-warehouse/reporte-warehouse.component';
import { Scanner13Component } from '@component/globales/scanner13/scanner13.component';
import { FiltroLoteComponent } from '../../components/filtro/filtro.component';
import { CommonModule } from '@angular/common';
import { BarChartComponent } from '@component/globales/chart/bar/bar.component';
import { LineChartComponent } from '@component/globales/chart/line/line.component';
import { PieChartComponent } from '@component/globales/chart/pie/pie.component';
import { RangosFiltroComponent } from '../../components/rangos/rangos.component';

@Component({
  selector: 'app-dashboard-admin',
  standalone: true,
  imports: [
    ReporteWarehouseComponent,
    Scanner13Component,
    FiltroLoteComponent,
    RangosFiltroComponent,
    CommonModule,

    BarChartComponent,
    LineChartComponent,
    PieChartComponent    
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

}
