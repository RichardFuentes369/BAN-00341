import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteVencimientoComponent {

  complementoFiltro = ''

  model = {
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    dias_restantes: '',
    estado_alerta: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    estado: '',
    nombre_producto: '',
    nombre_proveedor: '',
    cantidad_en_bodega: '',
  }

  limpiar() {
    this.model.lote = ''
    this.model.fecha_entrada = ''
    this.model.fecha_vencimiento = ''
    this.model.dias_restantes = ''
    this.model.estado_alerta = ''
    this.model.cantidad_comprada = ''
    this.model.cantidad_vendida = ''
    this.model.estado = ''
    this.model.nombre_producto = ''
    this.model.nombre_proveedor = ''
    this.model.cantidad_en_bodega = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''
    
    if (this.model.lote != '') {
      this.complementoFiltro += `&lote=${this.model.lote}`
    }
    if (this.model.fecha_entrada != '') {
      this.complementoFiltro += `&fecha_entrada=${this.model.fecha_entrada}`
    }
    if (this.model.fecha_vencimiento != '') {
      this.complementoFiltro += `&fecha_vencimiento=${this.model.fecha_vencimiento}`
    }    
    if (this.model.dias_restantes != '') {
      this.complementoFiltro += `&dias_restantes=${this.model.dias_restantes}`
    }    
    if (this.model.estado_alerta != '') {
      this.complementoFiltro += `&estado_alerta=${this.model.estado_alerta}`
    }    
    if (this.model.cantidad_comprada != '') {
      this.complementoFiltro += `&cantidad_comprada=${this.model.cantidad_comprada}`
    }    
    if (this.model.cantidad_vendida != '') {
      this.complementoFiltro += `&cantidad_vendida=${this.model.cantidad_vendida}`
    }    
    if (this.model.estado != '') {
      this.complementoFiltro += `&estado=${this.model.estado}`
    }    
    if (this.model.nombre_producto != '') {
      this.complementoFiltro += `&nombre_producto=${this.model.nombre_producto}`
    } 
    if (this.model.nombre_proveedor != '') {
      this.complementoFiltro += `&nombre_proveedor=${this.model.nombre_proveedor}`
    }
    if (this.model.cantidad_en_bodega != '') {
      this.complementoFiltro += `&cantidad_en_bodega=${this.model.cantidad_en_bodega}`
    }

    $(".complementoRuta").val(this.complementoFiltro)
  }

}
