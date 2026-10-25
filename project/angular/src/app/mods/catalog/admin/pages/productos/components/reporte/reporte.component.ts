import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-productos-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteProductoComponent {

  complementoFiltro = ''

  model = {
    id: '',  
    nombre: '',
    stock_minimo: '',
    es_perecedero: '',
    alerta_amarilla: '',
    alerta_naranja: '',
    estado: '',
    codigo_barra: '',
    medida: '',
    marca: '',
  }

  limpiar(){
    this.model.id = ''
    this.model.nombre = ''
    this.model.stock_minimo = ''
    this.model.es_perecedero = ''
    this.model.alerta_amarilla = ''
    this.model.alerta_naranja = ''
    this.model.estado = ''
    this.model.codigo_barra = ''
    this.model.medida = ''
    this.model.marca = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.id != ''){
      this.complementoFiltro += `&id=${this.model.id}`
    }
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    if(this.model.stock_minimo != ''){
      this.complementoFiltro += `&stock_minimo=${this.model.stock_minimo}`
    }
    if(this.model.es_perecedero != ''){
      this.complementoFiltro += `&es_perecedero=${this.model.es_perecedero}`
    }
    if(this.model.alerta_amarilla != ''){
      this.complementoFiltro += `&alerta_amarilla=${this.model.alerta_amarilla}`
    }
    if(this.model.alerta_naranja != ''){
      this.complementoFiltro += `&alerta_naranja=${this.model.alerta_naranja}`
    }
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`
    }
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}`
    }
    if(this.model.medida != ''){
      this.complementoFiltro += `&medida=${this.model.medida}`
    }
    if(this.model.marca != ''){
      this.complementoFiltro += `&marca=${this.model.marca}`
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }  

}
