import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MedidaService } from '../../../medida/service/medida.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroProductComponent {

  complementoFiltro = ''
  medidas: any[] = [];
  isLoading: boolean = false

  model = {
    nombre: '',
    marca: '',
    codigo_barra: '',
    stock_minimo: '',
    stock_maximo: '',
    unidad_medida: '',
    field: '',
    order: ''
  }

  constructor(
    private medidaService: MedidaService,
  ){

  }

  async ngOnInit() {
    this.getMedida()

    this.model = {
      nombre: sessionStorage.getItem('nombre') || '',
      marca: sessionStorage.getItem('marca') || '',
      codigo_barra: sessionStorage.getItem('codigo_barra') || '',
      stock_minimo: sessionStorage.getItem('stock_minimo') || '',
      stock_maximo: sessionStorage.getItem('stock_maximo') || '',
      unidad_medida: sessionStorage.getItem('unidad_medida') || '',
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }

    this.complementoFiltro = ''
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    if(this.model.marca != ''){
      this.complementoFiltro += `&marca=${this.model.marca}}`
    }    
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}`
    }
    if(this.model.stock_minimo != ''){
      this.complementoFiltro += `&stock_minimo=${this.model.stock_minimo}`
    }  
    if(this.model.stock_maximo != ''){
      this.complementoFiltro += `&stock_maximo=${this.model.stock_maximo}`
    }   
    if(this.model.unidad_medida != ''){
      this.complementoFiltro += `&unidad_medida=${this.model.unidad_medida}`
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
    this.model.nombre = ''
    this.model.marca = ''
    this.model.codigo_barra = ''
    this.model.stock_minimo = ''
    this.model.stock_maximo = ''
    this.model.unidad_medida = ''
    this.model.field = ''
    this.model.order = ''

    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('stock_maximo')
    sessionStorage.removeItem('unidad_medida')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('stock_maximo')
    sessionStorage.removeItem('unidad_medida')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
      sessionStorage.setItem('nombre', this.model.nombre)
    }
    if(this.model.marca != ''){
      this.complementoFiltro += `&marca=${this.model.marca}`
      sessionStorage.setItem('marca', this.model.marca)
    }
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}`
      sessionStorage.setItem('codigo_barra', this.model.codigo_barra)
    }
    if(this.model.stock_minimo != ''){
      this.complementoFiltro += `&stock_minimo=${this.model.stock_minimo}`
      sessionStorage.setItem('stock_minimo', this.model.stock_minimo)
    }
    if(this.model.stock_maximo != ''){
      this.complementoFiltro += `&stock_maximo=${this.model.stock_maximo}`
      sessionStorage.setItem('stock_maximo', this.model.stock_maximo)
    }
    if(this.model.unidad_medida != ''){
      this.complementoFiltro += `&unidad_medida=${this.model.unidad_medida}`
      sessionStorage.setItem('unidad_medida', this.model.unidad_medida)
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

  async getMedida() {
    this.isLoading = true;
    try {
      const medidaList = await this.medidaService.getDataList()
      this.medidas = medidaList.data[0].result;
    } finally {
      this.isLoading = false;
    }
  }

}
