import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toTimestampp } from '@function/System';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-sold-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroSoldComponent implements OnInit {

  complementoFiltro = ''

  model = {
    nro_factura: '',
    fecha_venta_minimo: '',
    fecha_venta_maximo: '',
    field: '',
    order: ''
  }

  async ngOnInit() {
    this.model = {
      nro_factura: sessionStorage.getItem('nro_factura') || '',
      fecha_venta_minimo: sessionStorage.getItem('fecha_venta_minimo') || '',
      fecha_venta_maximo: sessionStorage.getItem('fecha_venta_maximo') || '',
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }

    this.complementoFiltro = ''
    if(this.model.nro_factura != ''){
      this.complementoFiltro += `&nro_factura=${this.model.nro_factura}`
    }
    if(this.model.fecha_venta_minimo != ''){
      this.complementoFiltro += `&fecha_venta_minimo=${this.model.fecha_venta_minimo}`
    }
    if(this.model.fecha_venta_maximo != ''){
      this.complementoFiltro += `&fecha_venta_maximo=${this.model.fecha_venta_maximo}`      
    }
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nro_factura = ''
    this.model.fecha_venta_minimo = ''
    this.model.fecha_venta_maximo = ''
    this.model.field = ''
    this.model.order = ''

    sessionStorage.removeItem('nro_factura')
    sessionStorage.removeItem('fecha_venta_minimo')
    sessionStorage.removeItem('fecha_venta_maximo')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }
  
  filtrar(){
    this.complementoFiltro = ''

    sessionStorage.removeItem('nro_factura')
    sessionStorage.removeItem('fecha_venta_minimo')
    sessionStorage.removeItem('fecha_venta_maximo')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    if(this.model.nro_factura != ''){
      this.complementoFiltro += `&nro_factura=${this.model.nro_factura}`
      sessionStorage.setItem('nro_factura', this.model.nro_factura)
    }
    if(this.model.fecha_venta_minimo != ''){
      let fecha_venta_minimo = toTimestampp(this.model.fecha_venta_minimo)
      this.complementoFiltro += `&fecha_venta_minimo=${this.model.fecha_venta_minimo}`
      sessionStorage.setItem('fecha_venta_minimo', fecha_venta_minimo.toString())
    }
    if(this.model.fecha_venta_maximo != ''){
      let fecha_venta_maximo = toTimestampp(this.model.fecha_venta_maximo)
      this.complementoFiltro += `&fecha_venta_maximo=${this.model.fecha_venta_maximo}` 
      sessionStorage.setItem('fecha_venta_minimo', fecha_venta_maximo.toString())     
    }
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
      sessionStorage.setItem('field', this.model.field)
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
      sessionStorage.setItem('order', this.model.order)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
}
