import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-permisos',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './reporte-permisos.component.html',
  styleUrl: './reporte-permisos.component.scss',
})
export class ReportePermisosComponent {

}
