import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MedidaService } from '../../../medida/service/medida.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductosService } from '../../service/productos.service';

@Component({
  selector: 'app-producto-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroProductComponent {

  complementoFiltro = ''
  marcas: any[] = [];
  medidas: any[] = [];
  isLoading: boolean = false
  isReadonly:boolean = false
  filtro: string = ''

  model = {
    nombre: '',
    id_marca: '',
    codigo_barra: '',
    stock_minimo: '',
    stock_maximo: '',
    estado: '',
    es_perecedero: '',
    id_medida: '',
    marca_obj: null as any,
    medida_obj: null as any,
    field: '',
    order: ''
  }

  constructor(
    private medidaService: MedidaService,
    private productosService: ProductosService,
  ){

  }

  async ngOnInit() {
    this.model = {
      nombre: sessionStorage.getItem('nombre') || '',
      id_marca: sessionStorage.getItem('id_marca') || '',
      codigo_barra: sessionStorage.getItem('codigo_barra') || '',
      stock_minimo: sessionStorage.getItem('stock_minimo') || '',
      stock_maximo: sessionStorage.getItem('stock_maximo') || '',
      es_perecedero: sessionStorage.getItem('es_perecedero') || '',
      estado: sessionStorage.getItem('estado') || '',
      id_medida: sessionStorage.getItem('id_medida') || '',
      marca_obj: { id: sessionStorage.getItem('id_marca'), nombre: sessionStorage.getItem('nombre_marca') },
      medida_obj: { id: sessionStorage.getItem('id_marca'), nombre: sessionStorage.getItem('nombre_medida') },
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }
    this.filtro = sessionStorage.getItem('filtro') || '',

    this.complementoFiltro = ''
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    if(this.model.id_marca != ''){
      this.complementoFiltro += `&id_marca=${this.model.id_marca}`
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
    if(this.model.es_perecedero != ''){
      this.complementoFiltro += `&es_perecedero=${this.model.es_perecedero}`
    }  
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`
    }    
    if(this.model.id_medida != ''){
      this.complementoFiltro += `&id_medida=${this.model.id_medida}`
    }
    if(this.model.field != ''){
      this.complementoFiltro += `&field=${this.model.field}`      
    }
    if(this.model.order != ''){
      this.complementoFiltro += `&order=${this.model.order}`      
    }

    $(".complementoRuta").val(this.complementoFiltro)
  }

  onSearchB(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term
      this.isLoading = true;
      this.getMarcas();
    }
  }
  onClearB(){
    this.model.id_marca = ''
    sessionStorage.removeItem('id_marca')
    sessionStorage.removeItem('nombre_marca')
  }
  
  onClearM(){
    this.model.id_medida = ''
    sessionStorage.removeItem('id_medida')
    sessionStorage.removeItem('nombre_medida')
  }
  
  onSearchM(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term
      this.isLoading = true;
      this.getMedidas();
    }
  }

  onSelectChangeB(item: any) {
    sessionStorage.setItem('nombre_marca', item.nombre)
    this.model.id_marca = (item != undefined) ? item.id : null
  }

  onSelectChangeM(item: any) {
    sessionStorage.setItem('nombre_medida', item.nombre)
    this.model.id_medida = (item != undefined) ? item.id : null
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.filtro = ''
    this.model.nombre = ''
    this.model.id_marca = ''
    this.model.codigo_barra = ''
    this.model.stock_minimo = ''
    this.model.stock_maximo = ''
    this.model.estado = ''
    this.model.es_perecedero = ''
    this.model.id_medida = ''
    this.model.field = ''
    this.model.order = ''

    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('nombre_marca')
    sessionStorage.removeItem('id_marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('stock_maximo')
    sessionStorage.removeItem('estado')
    sessionStorage.removeItem('es_perecedero')
    sessionStorage.removeItem('nombre_medida')
    sessionStorage.removeItem('id_medida')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('filtro')
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('id_marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('stock_maximo')
    sessionStorage.removeItem('estado')
    sessionStorage.removeItem('es_perecedero')
    sessionStorage.removeItem('id_medida')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
      sessionStorage.setItem('nombre', this.model.nombre)
    }
    if(this.model.id_marca != ''){
      if(this.model.id_marca != null){
        this.complementoFiltro += `&id_marca=${this.model.id_marca}`
        sessionStorage.setItem('id_marca', this.model.id_marca)
      }
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
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`
      sessionStorage.setItem('estado', this.model.estado)
    }
    if(this.model.es_perecedero != ''){
      this.complementoFiltro += `&es_perecedero=${this.model.es_perecedero}`
      sessionStorage.setItem('es_perecedero', this.model.es_perecedero)
    }
    if(this.model.id_medida != ''){
      if(this.model.id_medida != null){
        this.complementoFiltro += `&id_medida=${this.model.id_medida}`
        sessionStorage.setItem('id_medida', this.model.id_medida)
      }
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

  async getMarcas() {
    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrandSearch(this.filtro)
      this.marcas = [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }  

  async getMedidas() {
    this.isLoading = true;
    try {
      const medidaList = await this.medidaService.getDataExtendSearch(this.filtro)
      this.medidas = [...medidaList.data];
    } finally {
      this.isLoading = false;
    }
  }
}
