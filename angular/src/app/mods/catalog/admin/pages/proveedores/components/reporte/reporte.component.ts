import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-proveedores-reporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteProveedorComponent {

  complementoFiltro = ''

  model = {
    id: '',
    nit: '',
    dv: '',
    razon_social: '',
    direccion: '',
    telefono: '',
    correo: ''
  }

  limpiar(){
    this.model.id = ''
    this.model.nit = ''
    this.model.dv = ''
    this.model.razon_social = ''
    this.model.direccion = ''
    this.model.telefono = ''
    this.model.correo = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.id != ''){
      this.complementoFiltro += `&id=${this.model.id}`
    }
    if(this.model.nit != ''){
      this.complementoFiltro += `&nit=${this.model.nit}`
    }
    if(this.model.dv != ''){
      this.complementoFiltro += `&dv=${this.model.dv}`
    }
    if(this.model.razon_social != ''){
      this.complementoFiltro += `&razon_social=${this.model.razon_social}`      
    }
    if(this.model.direccion != ''){
      this.complementoFiltro += `&direccion=${this.model.direccion}`      
    }
    if(this.model.telefono != ''){
      this.complementoFiltro += `&telefono=${this.model.telefono}`      
    }
    if(this.model.correo != ''){
      this.complementoFiltro += `&correo=${this.model.correo}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }  
}
