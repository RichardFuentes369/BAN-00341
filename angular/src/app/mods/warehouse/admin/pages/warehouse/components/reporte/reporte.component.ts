import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteWarehouseComponent {

  complementoFiltro = ''

  model = {
    id: '',  
    marca: '',
    lote: '',
    fecha_entrada: '',
    fecha_vencimiento: '',
    cantidad_comprada: '',
    cantidad_vendida: '',
    mermas: '',
    cantidad_en_bodega: '',
    unidad_de_medida: '',
    estado: '',
    codigo_barra: '',
    producto: '',
    proveedor: '',
  }

  limpiar(){
    this.model.id = '',  
    this.model.marca = '',
    this.model.lote = '',
    this.model.fecha_entrada = '',
    this.model.fecha_vencimiento = '',
    this.model.cantidad_comprada = '',
    this.model.cantidad_vendida = '',
    this.model.mermas = '',
    this.model.cantidad_en_bodega = '',
    this.model.unidad_de_medida = '',
    this.model.estado = '',
    this.model.codigo_barra = '',
    this.model.producto = '',
    this.model.proveedor = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.id != ''){
      this.complementoFiltro += `&id=${this.model.id}`
    }
    if(this.model.marca != ''){
      this.complementoFiltro += `&marca=${this.model.marca}`
    }
    if(this.model.lote != ''){
      this.complementoFiltro += `&lote=${this.model.lote}`
    }
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`
    }
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}`
    }
    if(this.model.producto != ''){
      this.complementoFiltro += `&producto=${this.model.producto}`
    }
    if(this.model.proveedor != ''){
      this.complementoFiltro += `&proveedor=${this.model.proveedor}`
    }
    
    if(this.model.fecha_entrada != ''){
      this.complementoFiltro += `&fecha_entrada=${this.model.fecha_entrada}`      
    }
    if(this.model.fecha_vencimiento != ''){
      this.complementoFiltro += `&fecha_vencimiento=${this.model.fecha_vencimiento}`      
    }
    if(this.model.cantidad_comprada != ''){
      this.complementoFiltro += `&cantidad_comprada=${this.model.cantidad_comprada}`      
    }
    if(this.model.cantidad_vendida != ''){
      this.complementoFiltro += `&cantidad_vendida=${this.model.cantidad_vendida}`      
    }
    if(this.model.mermas != ''){
      this.complementoFiltro += `&mermas=${this.model.mermas}`      
    }
    if(this.model.cantidad_en_bodega != ''){
      this.complementoFiltro += `&cantidad_en_bodega=${this.model.cantidad_en_bodega}`      
    }
    if(this.model.unidad_de_medida != ''){
      this.complementoFiltro += `&unidad_de_medida=${this.model.unidad_de_medida}`      
    }
    
    $(".complementoRuta").val(this.complementoFiltro)
  }  
}
