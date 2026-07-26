import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-inputselect',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectCustomComponent {

}
