import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-brand-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteMarcaComponent {

  complementoFiltro = ''

  model = {
    id: '',
    nombre: ''
  }

  limpiar(){
    this.model.id = ''
    this.model.nombre = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.id != ''){
      this.complementoFiltro += `&id=${this.model.id}`
    }
    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }  
}
