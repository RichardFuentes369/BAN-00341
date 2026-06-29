import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-mod-main-index',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'] // Asegúrate que sea styleUrls (plural)
})
export class MainIndexComponent {
  // Puedes añadir lógica aquí para filtrar datos de la tabla si lo deseas
}