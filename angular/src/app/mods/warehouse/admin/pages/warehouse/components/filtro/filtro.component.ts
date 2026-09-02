import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { toTimestampp } from '@function/System';
import { MedidaService } from '@mod/catalog/admin/pages/medida/service/medida.service';
import { ProductosService } from '@mod/catalog/admin/pages/productos/service/productos.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-warehouse-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule, NgSelectModule, CommonModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroWarehouseComponent implements OnInit {

  complementoFiltro = ''
  marcas: any[] = [];
  medidas: any[] = [];
  isLoading: boolean = false
  filtro1: string = ''
  filtro2: string = ''

  constructor(
    private productosService: ProductosService,
    private medidaService: MedidaService,
    private translate: TranslateService
  ) {
  }

  model = {
    estado: '',
    lote: '',
    id_medida: '',
    id_marca: '',
    id_producto: '',
    fecha_entrada_minimo: '',
    fecha_entrada_maximo: '',
    fecha_vencimiento_minimo: '',
    fecha_vencimiento_maximo: '',
    cantidad_en_bodega_minimo: '',
    cantidad_en_bodega_maximo: '',
    cantidad_comprada_minimo: '',
    cantidad_comprada_maximo: '',
    cantidad_vendida_minimo: '',
    cantidad_vendida_maximo: '',
    cantidad_afectada_minimo: '',
    cantidad_afectada_maximo: '',
    field: '',
    order: ''
  }

  async ngOnInit() {
    this.getMedida()
    this.model = {
      estado: sessionStorage.getItem('estado') || '',
      lote: sessionStorage.getItem('lote') || '',
      id_medida: sessionStorage.getItem('id_medida') || '',
      id_marca: sessionStorage.getItem('id_marca') || '',
      id_producto: sessionStorage.getItem('id_producto') || '',
      fecha_entrada_minimo: sessionStorage.getItem('fecha_entrada_minimo') || '',
      fecha_entrada_maximo: sessionStorage.getItem('fecha_entrada_maximo') || '',
      fecha_vencimiento_minimo: sessionStorage.getItem('fecha_vencimiento_minimo') || '',
      fecha_vencimiento_maximo: sessionStorage.getItem('fecha_vencimiento_maximo') || '',
      cantidad_en_bodega_minimo: sessionStorage.getItem('cantidad_en_bodega_minimo') || '',
      cantidad_en_bodega_maximo: sessionStorage.getItem('cantidad_en_bodega_maximo') || '',
      cantidad_comprada_minimo: sessionStorage.getItem('cantidad_comprada_minimo') || '',
      cantidad_comprada_maximo: sessionStorage.getItem('cantidad_comprada_maximo') || '',
      cantidad_vendida_minimo: sessionStorage.getItem('cantidad_vendida_minimo') || '',
      cantidad_vendida_maximo: sessionStorage.getItem('cantidad_vendida_maximo') || '',
      cantidad_afectada_minimo: sessionStorage.getItem('cantidad_afectada_minimo') || '',
      cantidad_afectada_maximo: sessionStorage.getItem('cantidad_afectada_maximo') || '',
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }

    this.complementoFiltro = ''
    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`      
    }
    if(this.model.lote != ''){
      this.complementoFiltro += `&lote=${this.model.lote}`      
    }
    if(this.model.id_medida != ''){
      this.complementoFiltro += `&id_medida=${this.model.id_medida}`      
    }
    if(this.model.fecha_entrada_minimo != ''){
      this.complementoFiltro += `&fecha_entrada_minimo=${this.model.fecha_entrada_minimo}`      
    }
    if(this.model.fecha_entrada_maximo != ''){
      this.complementoFiltro += `&fecha_entrada_maximo=${this.model.fecha_entrada_maximo}`      
    }
    if(this.model.fecha_vencimiento_minimo != ''){
      this.complementoFiltro += `&fecha_vencimiento_minimo=${this.model.fecha_vencimiento_minimo}`      
    }
    if(this.model.fecha_vencimiento_maximo != ''){
      this.complementoFiltro += `&fecha_vencimiento_maximo=${this.model.fecha_vencimiento_maximo}`      
    }
    if(this.model.cantidad_en_bodega_minimo != ''){
      this.complementoFiltro += `&cantidad_en_bodega_minimo=${this.model.cantidad_en_bodega_minimo}`      
    }
    if(this.model.cantidad_en_bodega_maximo != ''){
      this.complementoFiltro += `&cantidad_en_bodega_maximo=${this.model.cantidad_en_bodega_maximo}`      
    }
    if(this.model.cantidad_comprada_minimo != ''){
      this.complementoFiltro += `&cantidad_comprada_minimo=${this.model.cantidad_comprada_minimo}`      
    }
    if(this.model.cantidad_comprada_maximo != ''){
      this.complementoFiltro += `&cantidad_comprada_maximo=${this.model.cantidad_comprada_maximo}`      
    }
    if(this.model.cantidad_vendida_minimo != ''){
      this.complementoFiltro += `&cantidad_vendida_minimo=${this.model.cantidad_vendida_minimo}`      
    }
    if(this.model.cantidad_vendida_maximo != ''){
      this.complementoFiltro += `&cantidad_vendida_maximo=${this.model.cantidad_vendida_maximo}`      
    }
    if(this.model.cantidad_afectada_minimo != ''){
      this.complementoFiltro += `&cantidad_afectada_minimo=${this.model.cantidad_afectada_minimo}`      
    }
    if(this.model.cantidad_afectada_maximo != ''){
      this.complementoFiltro += `&cantidad_afectada_maximo=${this.model.cantidad_afectada_maximo}`      
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
    this.filtro1 = ''
    this.filtro2 = ''
    this.model.estado = '',
    this.model.lote = '',
    this.model.id_medida = '',
    this.model.id_marca = '',
    this.model.id_producto = '',
    this.model.fecha_entrada_minimo = '',
    this.model.fecha_entrada_maximo = '',
    this.model.fecha_vencimiento_minimo = '',
    this.model.fecha_vencimiento_maximo = '',
    this.model.cantidad_en_bodega_minimo = '',
    this.model.cantidad_en_bodega_maximo = '',
    this.model.cantidad_comprada_minimo = '',
    this.model.cantidad_comprada_maximo = '',
    this.model.cantidad_vendida_minimo = '',
    this.model.cantidad_vendida_maximo = '',
    this.model.cantidad_afectada_minimo = '',
    this.model.cantidad_afectada_maximo = '',
    this.model.field = ''
    this.model.order = ''
    
    sessionStorage.removeItem('estado'),
    sessionStorage.removeItem('lote'),
    sessionStorage.removeItem('id_medida'),
    sessionStorage.removeItem('id_marca'),
    sessionStorage.removeItem('id_producto'),
    sessionStorage.removeItem('fecha_entrada_minimo'),
    sessionStorage.removeItem('fecha_entrada_maximo'),
    sessionStorage.removeItem('fecha_vencimiento_minimo'),
    sessionStorage.removeItem('fecha_vencimiento_maximo'),
    sessionStorage.removeItem('cantidad_en_bodega_minimo'),
    sessionStorage.removeItem('cantidad_en_bodega_maximo'),
    sessionStorage.removeItem('cantidad_comprada_minimo'),
    sessionStorage.removeItem('cantidad_comprada_maximo'),
    sessionStorage.removeItem('cantidad_vendida_minimo'),
    sessionStorage.removeItem('cantidad_vendida_maximo'),
    sessionStorage.removeItem('cantidad_afectada_minimo'),
    sessionStorage.removeItem('cantidad_afectada_maximo'),
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }

  onSearchM(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro1 = term
      this.isLoading = true;
      this.getMarcas();
    }
  }

  onSearchP(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro2 = term
      this.isLoading = true;
      this.getProductos();
    }
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

  async getMarcas() {
    this.isLoading = true;
    try {
      const marcasList = await this.productosService.getDataBrandSearch(this.filtro1)
      this.marcas = [...marcasList.data];
    } finally {
      this.isLoading = false;
    }
  }  

  async getProductos() {
    this.isLoading = true;
    try {
      const productoList = await this.productosService.getDataBrandProductSearch(this.model.id_marca, this.filtro2)
      this.marcas = [...productoList.data];
    } finally {
      this.isLoading = false;
    }
  } 

  onSelectChangeM(item: any) {
    this.model.id_marca = (item != undefined) ? item.id : null
  }
  onSelectChangeP(item: any) {
    this.model.id_producto = (item != undefined) ? item.id : null
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('estado'),
    sessionStorage.removeItem('lote'),
    sessionStorage.removeItem('id_medida'),
    sessionStorage.removeItem('id_marca'),
    sessionStorage.removeItem('id_producto'),
    sessionStorage.removeItem('fecha_entrada_minimo'),
    sessionStorage.removeItem('fecha_entrada_maximo'),
    sessionStorage.removeItem('fecha_vencimiento_minimo'),
    sessionStorage.removeItem('fecha_vencimiento_maximo'),
    sessionStorage.removeItem('cantidad_en_bodega_minimo'),
    sessionStorage.removeItem('cantidad_en_bodega_maximo'),
    sessionStorage.removeItem('cantidad_comprada_minimo'),
    sessionStorage.removeItem('cantidad_comprada_maximo'),
    sessionStorage.removeItem('cantidad_vendida_minimo'),
    sessionStorage.removeItem('cantidad_vendida_maximo'),
    sessionStorage.removeItem('cantidad_afectada_minimo'),
    sessionStorage.removeItem('cantidad_afectada_maximo'),
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    if(this.model.estado != ''){
      this.complementoFiltro += `&estado=${this.model.estado}`
      sessionStorage.setItem('estado', this.model.estado)
    } 

    if(this.model.lote != ''){
      this.complementoFiltro += `&lote=${this.model.lote}`
      sessionStorage.setItem('lote', this.model.lote)
    } 

    if(this.model.id_medida != ''){
      this.complementoFiltro += `&id_medida=${this.model.id_medida}`
      sessionStorage.setItem('id_medida', this.model.id_medida)
    }
    if(this.model.id_marca != ''){
      this.complementoFiltro += `&id_marca=${this.model.id_marca}`
      sessionStorage.setItem('id_marca', this.model.id_marca)
    }   
    if(this.model.id_producto != ''){
      this.complementoFiltro += `&id_producto=${this.model.id_producto}`
      sessionStorage.setItem('id_producto', this.model.id_producto)
    }   
    if(this.model.fecha_entrada_minimo != ''){
      let fecha_entrada_minimo = toTimestampp(this.model.fecha_entrada_minimo)
      this.complementoFiltro += `&fecha_entrada_minimo=${fecha_entrada_minimo}`
      sessionStorage.setItem('fecha_entrada_minimo', fecha_entrada_minimo.toString())
    }    
    if(this.model.fecha_entrada_maximo != ''){
      let fecha_entrada_maximo = toTimestampp(this.model.fecha_entrada_maximo) + 86399
      this.complementoFiltro += `&fecha_entrada_maximo=${fecha_entrada_maximo}`
      sessionStorage.setItem('fecha_entrada_maximo', fecha_entrada_maximo.toString())
    }    
    if(this.model.fecha_vencimiento_minimo != ''){
      let fecha_vencimiento_minimo = toTimestampp(this.model.fecha_vencimiento_minimo)
      this.complementoFiltro += `&fecha_vencimiento_minimo=${fecha_vencimiento_minimo}`
      sessionStorage.setItem('fecha_vencimiento_minimo', fecha_vencimiento_minimo.toString())
    }  
    if(this.model.fecha_vencimiento_maximo != ''){
      let fecha_vencimiento_maximo = toTimestampp(this.model.fecha_vencimiento_maximo) + 86399
      this.complementoFiltro += `&fecha_vencimiento_maximo=${fecha_vencimiento_maximo}`
      sessionStorage.setItem('fecha_vencimiento_maximo', fecha_vencimiento_maximo.toString())
    }  
    if(this.model.cantidad_en_bodega_minimo != ''){
      this.complementoFiltro += `&cantidad_en_bodega_minimo=${this.model.cantidad_en_bodega_minimo}`
      sessionStorage.setItem('cantidad_en_bodega_minimo', this.model.cantidad_en_bodega_minimo)
    }
    if(this.model.cantidad_en_bodega_maximo != ''){
      this.complementoFiltro += `&cantidad_en_bodega_maximo=${this.model.cantidad_en_bodega_maximo}`
      sessionStorage.setItem('cantidad_en_bodega_maximo', this.model.cantidad_en_bodega_maximo)
    }
    if(this.model.cantidad_comprada_minimo != ''){
      this.complementoFiltro += `&cantidad_comprada_minimo=${this.model.cantidad_comprada_minimo}`
      sessionStorage.setItem('cantidad_comprada_minimo', this.model.cantidad_comprada_minimo)
    }
    if(this.model.cantidad_comprada_maximo != ''){
      this.complementoFiltro += `&cantidad_comprada_maximo=${this.model.cantidad_comprada_maximo}`
      sessionStorage.setItem('cantidad_comprada_maximo', this.model.cantidad_comprada_maximo)
    }
    if(this.model.cantidad_vendida_minimo != ''){
      this.complementoFiltro += `&cantidad_vendida_minimo=${this.model.cantidad_vendida_minimo}`
      sessionStorage.setItem('cantidad_vendida_minimo', this.model.cantidad_vendida_minimo)
    }
    if(this.model.cantidad_vendida_maximo != ''){
      this.complementoFiltro += `&cantidad_vendida_maximo=${this.model.cantidad_vendida_maximo}`
      sessionStorage.setItem('cantidad_vendida_maximo', this.model.cantidad_vendida_maximo)
    }
    if(this.model.cantidad_afectada_minimo != ''){
      this.complementoFiltro += `&cantidad_afectada_minimo=${this.model.cantidad_afectada_minimo}`
      sessionStorage.setItem('cantidad_afectada_minimo', this.model.cantidad_afectada_minimo)
    }
    if(this.model.cantidad_afectada_maximo != ''){
      this.complementoFiltro += `&cantidad_afectada_maximo=${this.model.cantidad_afectada_maximo}`
      sessionStorage.setItem('cantidad_afectada_maximo', this.model.cantidad_afectada_maximo)
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
