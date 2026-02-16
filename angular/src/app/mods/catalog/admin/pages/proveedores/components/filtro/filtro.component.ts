import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proveedor-filtro',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss'
})
export class FiltroProveedorComponent implements OnInit {

  complementoFiltro = ''

  model = {
    nit: '',
    razon_social: '',
    correo: ''
  }

  async ngOnInit() {
    this.model = {
      nit: sessionStorage.getItem('nit') || '',
      razon_social: sessionStorage.getItem('razon_social') || '',
      correo: sessionStorage.getItem('correo') || ''
    }

    this.complementoFiltro = ''
    if(this.model.nit != ''){
      this.complementoFiltro += `&nit=${this.model.nit}`
    }
    if(this.model.razon_social != ''){
      this.complementoFiltro += `&razon_social=${this.model.razon_social}`
    }
    if(this.model.correo != ''){
      this.complementoFiltro += `&correo=${this.model.correo}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }
  
  limpiar(){
    $(".complementoRuta").val('')
    this.complementoFiltro = ''
    this.model.nit = ''
    this.model.razon_social = ''
    this.model.correo = ''

    sessionStorage.removeItem('nit')
    sessionStorage.removeItem('razon_social')
    sessionStorage.removeItem('correo')
  }
  
  filtrar(){
    this.complementoFiltro = ''
    
    sessionStorage.removeItem('nit')
    sessionStorage.removeItem('razon_social')
    sessionStorage.removeItem('correo')

    if(this.model.nit != ''){
      this.complementoFiltro += `&nit=${this.model.nit}`
      sessionStorage.setItem('nit', this.model.nit)
    }
    if(this.model.razon_social != ''){
      this.complementoFiltro += `&razon_social=${this.model.razon_social}`
      sessionStorage.setItem('razon_social', this.model.razon_social)
    }
    if(this.model.correo != ''){
      this.complementoFiltro += `&correo=${this.model.correo}`      
      sessionStorage.setItem('correo', this.model.correo)
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }

}
