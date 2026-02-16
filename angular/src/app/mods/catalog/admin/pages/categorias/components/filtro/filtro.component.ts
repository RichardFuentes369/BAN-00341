import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-categoria-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroCategoriaComponent implements OnInit {

  complementoFiltro = ''

  model = {
    nombre: '',
  }

  async ngOnInit() {
    this.model = {
      nombre: sessionStorage.getItem('nombre') || '',
    }

    this.complementoFiltro = ''
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nombre = ''

    sessionStorage.removeItem('nombre')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('nombre')

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
      sessionStorage.setItem('nombre', this.model.nombre)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
