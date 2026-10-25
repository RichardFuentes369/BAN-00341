import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-alerts-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroAlertsSStockComponent implements OnInit {

  complementoFiltro = ''

  model = {
    field: '',
    order: '',
    p_codigo_barra: '',
    p_nombre_producto: '',
    p_stock_min: '',
    p_stock_max: '',
    p_bodega_min: '',
    p_bodega_max: '',
    p_aviso_stock: '',
  }

  async ngOnInit() {
    this.model = {
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || '',

      p_codigo_barra: sessionStorage.getItem('p_codigo_barra') || '',
      p_nombre_producto: sessionStorage.getItem('p_nombre_producto') || '',
      p_stock_min: sessionStorage.getItem('p_stock_min') || '',
      p_stock_max: sessionStorage.getItem('p_stock_max') || '',
      p_bodega_min: sessionStorage.getItem('p_bodega_min') || '',
      p_bodega_max: sessionStorage.getItem('p_bodega_max') || '',
      p_aviso_stock: sessionStorage.getItem('p_aviso_stock') || '',
    }

    this.complementoFiltro = ''
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
    }
    if(this.model.p_codigo_barra != ''){
      this.complementoFiltro += `&p_codigo_barra=${this.model.p_codigo_barra}`      
    }
    if(this.model.p_nombre_producto != ''){
      this.complementoFiltro += `&p_nombre_producto=${this.model.p_nombre_producto}`      
    }
    if(this.model.p_stock_min != ''){
      this.complementoFiltro += `&p_stock_min=${this.model.p_stock_min}`      
    }
    if(this.model.p_stock_max != ''){
      this.complementoFiltro += `&p_stock_max=${this.model.p_stock_max}`      
    }
    if(this.model.p_bodega_min != ''){
      this.complementoFiltro += `&p_bodega_min=${this.model.p_bodega_min}`      
    }
    if(this.model.p_bodega_max != ''){
      this.complementoFiltro += `&p_bodega_max=${this.model.p_bodega_max}`      
    }
    if(this.model.p_aviso_stock != ''){
      this.complementoFiltro += `&p_aviso_stock=${this.model.p_aviso_stock}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.field = ''
    this.model.order = '' 
    this.model.p_codigo_barra = '',
    this.model.p_nombre_producto = '',
    this.model.p_stock_min = '',
    this.model.p_stock_max = '',
    this.model.p_bodega_min = '',
    this.model.p_bodega_max = '',
    this.model.p_aviso_stock = '',

    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    sessionStorage.removeItem('p_codigo_barra')
    sessionStorage.removeItem('p_nombre_producto')
    sessionStorage.removeItem('p_stock_min')
    sessionStorage.removeItem('p_stock_max')
    sessionStorage.removeItem('p_bodega_min')
    sessionStorage.removeItem('p_bodega_max')
    sessionStorage.removeItem('p_aviso_stock')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
    
    sessionStorage.removeItem('p_codigo_barra')
    sessionStorage.removeItem('p_nombre_producto')
    sessionStorage.removeItem('p_stock_min')
    sessionStorage.removeItem('p_stock_max')
    sessionStorage.removeItem('p_bodega_min')
    sessionStorage.removeItem('p_bodega_max')
    sessionStorage.removeItem('p_aviso_stock')

    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
      sessionStorage.setItem('field', this.model.field)
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
      sessionStorage.setItem('order', this.model.order)
    }
    if(this.model.p_codigo_barra != ''){
      this.complementoFiltro += `&p_codigo_barra=${this.model.p_codigo_barra}`      
    }
    if(this.model.p_nombre_producto != ''){
      this.complementoFiltro += `&p_nombre_producto=${this.model.p_nombre_producto}`      
    }
    if(this.model.p_stock_min != ''){
      this.complementoFiltro += `&p_stock_min=${this.model.p_stock_min}`      
    }
    if(this.model.p_stock_max != ''){
      this.complementoFiltro += `&p_stock_max=${this.model.p_stock_max}`      
    }
    if(this.model.p_bodega_min != ''){
      this.complementoFiltro += `&p_bodega_min=${this.model.p_bodega_min}`      
    }
    if(this.model.p_bodega_max != ''){
      this.complementoFiltro += `&p_bodega_max=${this.model.p_bodega_max}`      
    }
    if(this.model.p_aviso_stock != ''){
      this.complementoFiltro += `&p_aviso_stock=${this.model.p_aviso_stock}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
