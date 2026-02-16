import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-information-card',
  standalone: true,
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {

  @Input() title: string = '';
  @Input() content: string = '';

}
