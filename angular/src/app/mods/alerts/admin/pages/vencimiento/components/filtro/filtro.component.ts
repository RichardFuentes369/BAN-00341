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
export class FiltroAlertsVComponent implements OnInit {

  complementoFiltro = ''

  model = {
    field: '',
    order: '',
    p_lote: '',
    p_codigo_barra: '',
    p_nombre_producto: '',
    p_cantidad_comprada_min: '',
    p_cantidad_comprada_max: '',
    p_cantidad_vendida_min: '',
    p_cantidad_vendida_max: '',
    p_cantidad_bodega_min: '',
    p_cantidad_bodega_max: '',
    p_dias_restantes_min: '',
    p_dias_restantes_max: '',
    p_fecha_entrada_min: '',
    p_fecha_entrada_max: '',
    p_fecha_vencimiento_min: '',
    p_fecha_vencimiento_max: ''
  }

  async ngOnInit() {
    this.model = {
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || '',

      p_lote: sessionStorage.getItem('p_lote') || '',
      p_codigo_barra: sessionStorage.getItem('p_codigo_barra') || '',
      p_nombre_producto: sessionStorage.getItem('p_nombre_producto') || '',
      p_cantidad_comprada_min: sessionStorage.getItem('p_cantidad_comprada_min') || '',
      p_cantidad_comprada_max: sessionStorage.getItem('p_cantidad_comprada_max') || '',
      p_cantidad_vendida_min: sessionStorage.getItem('p_cantidad_vendida_min') || '',
      p_cantidad_vendida_max: sessionStorage.getItem('p_cantidad_vendida_max') || '',
      p_cantidad_bodega_min: sessionStorage.getItem('p_cantidad_bodega_min') || '',
      p_cantidad_bodega_max: sessionStorage.getItem('p_cantidad_bodega_max') || '',
      p_dias_restantes_min: sessionStorage.getItem('p_dias_restantes_min') || '',
      p_dias_restantes_max: sessionStorage.getItem('p_dias_restantes_max') || '',
      p_fecha_entrada_min: sessionStorage.getItem('p_fecha_entrada_min') || '',
      p_fecha_entrada_max: sessionStorage.getItem('p_fecha_entrada_max') || '',
      p_fecha_vencimiento_min: sessionStorage.getItem('p_fecha_vencimiento_min') || '',
      p_fecha_vencimiento_max: sessionStorage.getItem('p_fecha_vencimiento_max') || ''
    }

    this.complementoFiltro = ''
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
    }
    if(this.model.p_lote != ''){
      this.complementoFiltro += `&p_lote=${this.model.p_lote}`      
    }
    if(this.model.p_codigo_barra != ''){
      this.complementoFiltro += `&p_codigo_barra=${this.model.p_codigo_barra}`      
    }
    if(this.model.p_nombre_producto != ''){
      this.complementoFiltro += `&p_nombre_producto=${this.model.p_nombre_producto}`      
    }
    if(this.model.p_cantidad_comprada_min != ''){
      this.complementoFiltro += `&p_cantidad_comprada_min=${this.model.p_cantidad_comprada_min}`      
    }
    if(this.model.p_cantidad_comprada_max != ''){
      this.complementoFiltro += `&p_cantidad_comprada_max=${this.model.p_cantidad_comprada_max}`      
    }
    if(this.model.p_cantidad_vendida_min != ''){
      this.complementoFiltro += `&p_cantidad_vendida_min=${this.model.p_cantidad_vendida_min}`      
    }
    if(this.model.p_cantidad_vendida_max != ''){
      this.complementoFiltro += `&p_cantidad_vendida_max=${this.model.p_cantidad_vendida_max}`      
    }
    if(this.model.p_cantidad_bodega_min != ''){
      this.complementoFiltro += `&p_cantidad_bodega_min=${this.model.p_cantidad_bodega_min}`      
    }
    if(this.model.p_cantidad_bodega_max != ''){
      this.complementoFiltro += `&p_cantidad_bodega_max=${this.model.p_cantidad_bodega_max}`      
    }
    if(this.model.p_dias_restantes_min != ''){
      this.complementoFiltro += `&p_dias_restantes_min=${this.model.p_dias_restantes_min}`      
    }
    if(this.model.p_dias_restantes_max != ''){
      this.complementoFiltro += `&p_dias_restantes_max=${this.model.p_dias_restantes_max}`      
    }
    if(this.model.p_fecha_entrada_min != ''){
      this.complementoFiltro += `&p_fecha_entrada_min=${this.model.p_fecha_entrada_min}`      
    }
    if(this.model.p_fecha_entrada_max != ''){
      this.complementoFiltro += `&p_fecha_entrada_max=${this.model.p_fecha_entrada_max}`      
    }
    if(this.model.p_fecha_vencimiento_min != ''){
      this.complementoFiltro += `&p_fecha_vencimiento_min=${this.model.p_fecha_vencimiento_min}`      
    }
    if(this.model.p_fecha_vencimiento_max != ''){
      this.complementoFiltro += `&p_fecha_vencimiento_max=${this.model.p_fecha_vencimiento_max}`      
    }
    
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.field = ''
    this.model.order = '' 
    
    this.model.p_lote = ''
    this.model.p_codigo_barra = ''
    this.model.p_nombre_producto = ''
    this.model.p_cantidad_comprada_min = ''
    this.model.p_cantidad_comprada_max = ''
    this.model.p_cantidad_vendida_min = ''
    this.model.p_cantidad_vendida_max = ''
    this.model.p_cantidad_bodega_min = ''
    this.model.p_cantidad_bodega_max = ''
    this.model.p_dias_restantes_min = ''
    this.model.p_dias_restantes_max = ''
    this.model.p_fecha_entrada_min = ''
    this.model.p_fecha_entrada_max = ''
    this.model.p_fecha_vencimiento_min = ''
    this.model.p_fecha_vencimiento_max = ''

    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    sessionStorage.removeItem('p_lote')
    sessionStorage.removeItem('p_codigo_barra')
    sessionStorage.removeItem('p_nombre_producto')
    sessionStorage.removeItem('p_cantidad_comprada_min')
    sessionStorage.removeItem('p_cantidad_comprada_max')
    sessionStorage.removeItem('p_cantidad_vendida_min')
    sessionStorage.removeItem('p_cantidad_vendida_max')
    sessionStorage.removeItem('p_cantidad_bodega_min')
    sessionStorage.removeItem('p_cantidad_bodega_max')
    sessionStorage.removeItem('p_dias_restantes_min')
    sessionStorage.removeItem('p_dias_restantes_max')
    sessionStorage.removeItem('p_fecha_entrada_min')
    sessionStorage.removeItem('p_fecha_entrada_max')
    sessionStorage.removeItem('p_fecha_vencimiento_min')
    sessionStorage.removeItem('p_fecha_vencimiento_max')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    sessionStorage.removeItem('p_lote')
    sessionStorage.removeItem('p_codigo_barra')
    sessionStorage.removeItem('p_nombre_producto')
    sessionStorage.removeItem('p_cantidad_comprada_min')
    sessionStorage.removeItem('p_cantidad_comprada_max')
    sessionStorage.removeItem('p_cantidad_vendida_min')
    sessionStorage.removeItem('p_cantidad_vendida_max')
    sessionStorage.removeItem('p_cantidad_bodega_min')
    sessionStorage.removeItem('p_cantidad_bodega_max')
    sessionStorage.removeItem('p_dias_restantes_min')
    sessionStorage.removeItem('p_dias_restantes_max')
    sessionStorage.removeItem('p_fecha_entrada_min')
    sessionStorage.removeItem('p_fecha_entrada_max')
    sessionStorage.removeItem('p_fecha_vencimiento_min')
    sessionStorage.removeItem('p_fecha_vencimiento_max')

    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
      sessionStorage.setItem('field', this.model.field)
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
      sessionStorage.setItem('order', this.model.order)
    }
    if(this.model.p_cantidad_comprada_min != ''){
      this.complementoFiltro += `&p_cantidad_comprada_min=${this.model.p_cantidad_comprada_min}`      
    }
    if(this.model.p_cantidad_comprada_max != ''){
      this.complementoFiltro += `&p_cantidad_comprada_max=${this.model.p_cantidad_comprada_max}`      
    }
    if(this.model.p_cantidad_vendida_min != ''){
      this.complementoFiltro += `&p_cantidad_vendida_min=${this.model.p_cantidad_vendida_min}`      
    }
    if(this.model.p_cantidad_vendida_max != ''){
      this.complementoFiltro += `&p_cantidad_vendida_max=${this.model.p_cantidad_vendida_max}`      
    }
    if(this.model.p_cantidad_bodega_min != ''){
      this.complementoFiltro += `&p_cantidad_bodega_min=${this.model.p_cantidad_bodega_min}`      
    }
    if(this.model.p_cantidad_bodega_max != ''){
      this.complementoFiltro += `&p_cantidad_bodega_max=${this.model.p_cantidad_bodega_max}`      
    }
    if(this.model.p_dias_restantes_min != ''){
      this.complementoFiltro += `&p_dias_restantes_min=${this.model.p_dias_restantes_min}`      
    }
    if(this.model.p_dias_restantes_max != ''){
      this.complementoFiltro += `&p_dias_restantes_max=${this.model.p_dias_restantes_max}`      
    }
    if(this.model.p_fecha_entrada_min != ''){
      this.complementoFiltro += `&p_fecha_entrada_min=${this.model.p_fecha_entrada_min}`      
    }
    if(this.model.p_fecha_entrada_max != ''){
      this.complementoFiltro += `&p_fecha_entrada_max=${this.model.p_fecha_entrada_max}`      
    }
    if(this.model.p_fecha_vencimiento_min != ''){
      this.complementoFiltro += `&p_fecha_vencimiento_min=${this.model.p_fecha_vencimiento_min}`      
    }
    if(this.model.p_fecha_vencimiento_max != ''){
      this.complementoFiltro += `&p_fecha_vencimiento_max=${this.model.p_fecha_vencimiento_max}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
