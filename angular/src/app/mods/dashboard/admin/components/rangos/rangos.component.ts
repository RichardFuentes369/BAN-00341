import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-rangos',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './rangos.component.html',
  styleUrl: './rangos.component.scss',
})
export class RangosFiltroComponent {
  @Output() filterDateMV = new EventEmitter<any>();

  model = {
    fecha_inicio: '',
    fecha_fin: ''
  }

  emitirFechas() {
    this.filterDateMV.emit(this.model);
  }

  limpiarCampo() {
    this.model.fecha_inicio = '';
    this.model.fecha_fin = '';
    this.emitirFechas(); 
  }
}
