import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-crear-lote',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './crear-lote.component.html',
  styleUrl: './crear-lote.component.scss',
})
export class CrearLoteComponent {

}
