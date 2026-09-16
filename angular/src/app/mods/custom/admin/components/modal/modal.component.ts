import { Component } from '@angular/core';
import { CrearDummieComponent } from './components/crear-dummie/crear-dummie.component';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    CrearDummieComponent
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalCustomComponent {

}
