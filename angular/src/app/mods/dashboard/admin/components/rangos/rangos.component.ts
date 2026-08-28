import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
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

  constructor(
    private translate: TranslateService
  ) {
  }

  model = {
    fecha_inicio: '',
    fecha_fin: ''
  }

}
