import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { RegistroService } from '../../../registro/service/registro.service';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { TipoService } from '../../../tipo/service/tipo.service';

@Component({
  selector: 'app-registro-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule, NgSelectModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroRegistroComponent {

  complementoFiltro = ''
  tipos_merma: any[] = [];
  isReadonly:boolean = false
  isLoading: boolean = false
  filtro: string = ''

  model = {
    lote: '',
    codigo_barra: '',
    id_tipo_merma: '',
    fecha_reporte_minimo: '',
    fecha_reporte_maximo: '',
    cantidad_afectada_minimo: '',
    cantidad_afectada_maximo: '',
    valor_perdido_minimo: '',
    valor_perdido_maximo: '',
    field: '',
    order: ''
  }

  constructor(
    private registroService: RegistroService,
    private tipoService: TipoService
  ){

  }

  async ngOnInit() {
    this.getTiposMerma()

    this.model = {
      lote: sessionStorage.getItem('lote') || '',
      codigo_barra: sessionStorage.getItem('codigo_barra') || '',
      id_tipo_merma: sessionStorage.getItem('id_tipo_merma') || '',
      fecha_reporte_minimo: sessionStorage.getItem('fecha_reporte_minimo') || '',
      fecha_reporte_maximo: sessionStorage.getItem('fecha_reporte_maximo') || '',
      cantidad_afectada_minimo: sessionStorage.getItem('cantidad_afectada_minimo') || '',
      cantidad_afectada_maximo: sessionStorage.getItem('cantidad_afectada_maximo') || '',
      valor_perdido_minimo: sessionStorage.getItem('valor_perdido_minimo') || '',
      valor_perdido_maximo: sessionStorage.getItem('valor_perdido_maximo') || '',
      field: sessionStorage.getItem('field') || '',
      order: sessionStorage.getItem('order') || ''
    }

    this.complementoFiltro = ''
    if(this.model.lote != ''){
      this.complementoFiltro += `&lote=${this.model.lote}`
    }
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}}`
    }    
    if(this.model.id_tipo_merma != ''){
      this.complementoFiltro += `&id_tipo_merma=${this.model.id_tipo_merma}`
    } 
    if(this.model.fecha_reporte_minimo != ''){
      this.complementoFiltro += `&fecha_reporte_minimo=${this.model.fecha_reporte_minimo}`
    } 
    if(this.model.fecha_reporte_maximo != ''){
      this.complementoFiltro += `&fecha_reporte_maximo=${this.model.fecha_reporte_maximo}`
    }
    if(this.model.cantidad_afectada_minimo != ''){
      this.complementoFiltro += `&cantidad_afectada_minimo=${this.model.cantidad_afectada_minimo}`
    }
    if(this.model.cantidad_afectada_maximo != ''){
      this.complementoFiltro += `&cantidad_afectada_maximo=${this.model.cantidad_afectada_maximo}`
    }
    if(this.model.valor_perdido_minimo != ''){
      this.complementoFiltro += `&valor_perdido_minimo=${this.model.valor_perdido_minimo}`
    }
    if(this.model.valor_perdido_maximo != ''){
      this.complementoFiltro += `&valor_perdido_maximo=${this.model.valor_perdido_maximo}`
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
    this.model.lote = ''
    this.model.codigo_barra = ''
    this.model.id_tipo_merma = ''
    this.model.fecha_reporte_minimo = ''
    this.model.fecha_reporte_maximo = ''
    this.model.cantidad_afectada_minimo = ''
    this.model.cantidad_afectada_maximo = ''
    this.model.valor_perdido_minimo = ''
    this.model.valor_perdido_maximo = ''
    this.model.field = ''
    this.model.order = ''

    sessionStorage.removeItem('lote')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('id_tipo_merma')
    sessionStorage.removeItem('fecha_reporte_minimo')
    sessionStorage.removeItem('fecha_reporte_maximo')
    sessionStorage.removeItem('cantidad_afectada_minimo')
    sessionStorage.removeItem('cantidad_afectada_maximo')
    sessionStorage.removeItem('valor_perdido_minimo')
    sessionStorage.removeItem('valor_perdido_maximo')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')
  }
  
  filtrar(){
    this.complementoFiltro = ''

    sessionStorage.removeItem('lote')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('id_tipo_merma')
    sessionStorage.removeItem('fecha_reporte_minimo')
    sessionStorage.removeItem('fecha_reporte_maximo')
    sessionStorage.removeItem('cantidad_afectada_minimo')
    sessionStorage.removeItem('cantidad_afectada_maximo')
    sessionStorage.removeItem('valor_perdido_minimo')
    sessionStorage.removeItem('valor_perdido_maximo')
    sessionStorage.removeItem('field')
    sessionStorage.removeItem('order')

    if(this.model.lote != ''){
      this.complementoFiltro += `&lote=${this.model.lote}`
      sessionStorage.setItem('lote', this.model.lote)
    }
    if(this.model.codigo_barra != ''){
      this.complementoFiltro += `&codigo_barra=${this.model.codigo_barra}`
      sessionStorage.setItem('codigo_barra', this.model.codigo_barra)
    }
    if(this.model.fecha_reporte_minimo != ''){
      this.complementoFiltro += `&fecha_reporte_minimo=${this.model.fecha_reporte_minimo}`
      sessionStorage.setItem('fecha_reporte_minimo', this.model.fecha_reporte_minimo)
    }
    if(this.model.fecha_reporte_maximo != ''){
      this.complementoFiltro += `&fecha_reporte_maximo=${this.model.fecha_reporte_maximo}`
      sessionStorage.setItem('fecha_reporte_maximo', this.model.fecha_reporte_maximo)
    }
    if(this.model.cantidad_afectada_minimo != ''){
      this.complementoFiltro += `&cantidad_afectada_minimo=${this.model.cantidad_afectada_minimo}`
      sessionStorage.setItem('cantidad_afectada_minimo', this.model.cantidad_afectada_minimo)
    }
    if(this.model.cantidad_afectada_maximo != ''){
      this.complementoFiltro += `&cantidad_afectada_maximo=${this.model.cantidad_afectada_maximo}`
      sessionStorage.setItem('cantidad_afectada_maximo', this.model.cantidad_afectada_maximo)
    }    
    if(this.model.valor_perdido_minimo != ''){
      this.complementoFiltro += `&valor_perdido_minimo=${this.model.valor_perdido_minimo}`
      sessionStorage.setItem('valor_perdido_minimo', this.model.valor_perdido_minimo)
    }    
    if(this.model.valor_perdido_maximo != ''){
      this.complementoFiltro += `&valor_perdido_maximo=${this.model.valor_perdido_maximo}`
      sessionStorage.setItem('valor_perdido_maximo', this.model.valor_perdido_maximo)
    }
    if(this.model.id_tipo_merma != ''){
      this.complementoFiltro += `&id_tipo_merma=${this.model.id_tipo_merma}`
      sessionStorage.setItem('id_tipo_merma', this.model.id_tipo_merma)
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

  onSearch(event: any) {
    const term = event.term;
    if (term && term.length >= 3) {
      this.filtro = term
      this.isLoading = true;
      this.getTiposMerma();
    }
  }

  onSelectChange(item: any) {
    this.model.id_tipo_merma = (item != undefined) ? item.id : null
  }

  async getTiposMerma() {
    this.isLoading = true;
    try {
      const mermaList = await this.tipoService.getDataTypeSearch(this.filtro)
      this.tipos_merma = [...mermaList.data];
    } finally {
      this.isLoading = false;
    }
  }  

}
