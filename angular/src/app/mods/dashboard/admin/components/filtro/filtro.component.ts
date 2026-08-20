import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-lote',
  standalone: true,
  imports: [TranslateModule, FormsModule, CommonModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.scss',
})
export class FiltroLoteComponent {

}
