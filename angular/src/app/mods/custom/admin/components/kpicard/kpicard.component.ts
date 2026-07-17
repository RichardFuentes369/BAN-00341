import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-custom-kpicard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './kpicard.component.html',
  styleUrl: './kpicard.component.scss',
})
export class KpicardCustomComponent {

  title = 'Titulo contador'
  displayValue = 200
  img = 'assets/images/img_actived.png'

}
