import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-user-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteUsuarioComponent {

  complementoFiltro = ''

  model = {
    id: '',
    email: '',
    firstName: '',
    lastName: '',
    isActive: ''
  }

  limpiar(){
    this.model.id = ''
    this.model.email = ''
    this.model.firstName = ''
    this.model.lastName = ''
    this.model.isActive = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.id != ''){
      this.complementoFiltro += `&id=${this.model.id}`
    }
    if(this.model.email != ''){
      this.complementoFiltro += `&email=${this.model.email}`
    }
    if(this.model.firstName != ''){
      this.complementoFiltro += `&firstName=${this.model.firstName}`      
    }
    if(this.model.lastName != ''){
      this.complementoFiltro += `&lastName=${this.model.lastName}`      
    }
    if(this.model.isActive != ''){
      this.complementoFiltro += `&isActive=${this.model.isActive}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }  

}
