import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InformacionComponent } from '@mod/main/index/components/informacion/informacion.component';
import { ModulosComponent } from '@mod/main/index/components/modulos/modulos.component';
import { ContactanosComponent } from '@mod/main/index/components/contactanos/contactanos.component';

@Component({
  selector: 'app-mod-main-index',
  standalone: true,
  imports: [
    CommonModule, 
    InformacionComponent,
    ModulosComponent,
    ContactanosComponent
  ],
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'] // Asegúrate que sea styleUrls (plural)
})
export class MainIndexComponent {
  // Puedes añadir lógica aquí para filtrar datos de la tabla si lo deseas
}