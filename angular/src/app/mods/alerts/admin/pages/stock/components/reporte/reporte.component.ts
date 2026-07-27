import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-alertstockreporte',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './reporte.component.html',
  styleUrl: './reporte.component.scss',
})
export class ReporteStockComponent {

  complementoFiltro = ''

  model = {
    nombre: '',
    stock_minimo: '',
    total_productos_disponibles: '',
    aviso_stock: '',
  }

  limpiar(){
    this.model.nombre = ''
    this.model.stock_minimo = ''
    this.model.total_productos_disponibles = ''
    this.model.aviso_stock = ''
  }

  generar(formato: 'excel' | 'csv') {

    this.complementoFiltro = ''

    if(this.model.nombre != ''){
      this.complementoFiltro += `&nombre=${this.model.nombre}`
    }
    if(this.model.stock_minimo != ''){
      this.complementoFiltro += `&stock_minimo=${this.model.stock_minimo}`
    }
    if(this.model.total_productos_disponibles != ''){
      this.complementoFiltro += `&total_productos_disponibles=${this.model.total_productos_disponibles}`      
    }
    if(this.model.aviso_stock != ''){
      this.complementoFiltro += `&aviso_stock=${this.model.aviso_stock}`      
    }
    $(".complementoRuta").val(this.complementoFiltro)
  }  

}
