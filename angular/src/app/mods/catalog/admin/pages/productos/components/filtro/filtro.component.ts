import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-producto-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroProductComponent {

  complementoFiltro = ''

  model = {
    nombre: '',
    marca: '',
    codigo_barra: '',
    stock_minimo: '',
    unidad_medida: '',
  }

  async ngOnInit() {
    this.model = {
      nombre: sessionStorage.getItem('nombre') || '',
      marca: sessionStorage.getItem('marca') || '',
      codigo_barra: sessionStorage.getItem('codigo_barra') || '',
      stock_minimo: sessionStorage.getItem('stock_minimo') || '',
      unidad_medida: sessionStorage.getItem('unidad_medida') || '',
    }

    this.complementoFiltro = ''
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}&marca=${this.model.marca}&codigo_barra=${this.model.codigo_barra}&stock_minimo=${this.model.stock_minimo}&unidad_medida=${this.model.unidad_medida}`
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nombre = ''

    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('unidad_medida')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('nombre')
    sessionStorage.removeItem('marca')
    sessionStorage.removeItem('codigo_barra')
    sessionStorage.removeItem('stock_minimo')
    sessionStorage.removeItem('unidad_medida')

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
      sessionStorage.setItem('nombre', this.model.nombre)
    }
    if(this.model.nombre != ''){
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
    if(this.model.unidad_medida != ''){
      this.complementoFiltro += `&unidad_medida=${this.model.unidad_medida}`
      sessionStorage.setItem('unidad_medida', this.model.unidad_medida)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
