import { Component } from '@angular/core';
import { CrearUsuariosComponent } from '@mod/users/admin/components/crear-usuarios/crear-usuarios.component';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    CrearUsuariosComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalCustomComponent {

}
