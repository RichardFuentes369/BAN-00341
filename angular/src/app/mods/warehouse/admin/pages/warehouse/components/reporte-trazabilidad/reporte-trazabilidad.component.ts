import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-trazabilidad',
  standalone: true,
  imports: [
    TranslateModule, 
    FormsModule,
  ],
  templateUrl: './reporte-trazabilidad.component.html',
  styleUrl: './reporte-trazabilidad.component.scss',
})
export class ReporteTrazabilidadComponent {

}
