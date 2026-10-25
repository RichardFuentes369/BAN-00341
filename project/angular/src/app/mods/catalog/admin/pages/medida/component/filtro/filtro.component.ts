import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroMedidaComponent implements OnInit {

  complementoFiltro = ''

  model = {
    nombre: '',
    // cantidad_minimo: '',
    // cantidad_maximo: '',
  }

  async ngOnInit() {
    this.model = {
      nombre: sessionStorage.getItem('nombre') || '',
      // cantidad_minimo: sessionStorage.getItem('cantidad_minimo') || '',
      // cantidad_maximo: sessionStorage.getItem('cantidad_maximo') || '',
    }

    this.complementoFiltro = ''
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    // if(this.model.cantidad_minimo != ''){
    //   this.complementoFiltro += `&cantidad_minimo=${this.model.cantidad_minimo}`
    // }
    // if(this.model.cantidad_maximo != ''){
    //   this.complementoFiltro += `&cantidad_maximo=${this.model.cantidad_maximo}`
    // }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nombre = ''
    // this.model.cantidad_minimo = ''
    // this.model.cantidad_maximo = ''

    sessionStorage.removeItem('nombre')
    // sessionStorage.removeItem('cantidad_minimo')
    // sessionStorage.removeItem('cantidad_maximo')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('nombre')
    // sessionStorage.removeItem('cantidad_minimo')
    // sessionStorage.removeItem('cantidad_maximo')

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
      sessionStorage.setItem('nombre', this.model.nombre)
    }
    // if(this.model.cantidad_minimo != ''){
    //   this.complementoFiltro += `&cantidad_minimo=${this.model.cantidad_minimo}`
    //   sessionStorage.setItem('cantidad_minimo', this.model.cantidad_minimo)
    // }
    // if(this.model.cantidad_maximo != ''){
    //   this.complementoFiltro += `&cantidad_maximo=${this.model.cantidad_maximo}`
    //   sessionStorage.setItem('cantidad_maximo', this.model.cantidad_maximo)
    // }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}