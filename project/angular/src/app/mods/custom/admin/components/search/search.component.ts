import { Component } from '@angular/core';
import { FiltroUsuariosComponent } from '@mod/users/admin/components/filtro/filtro.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-search',
  standalone: true,
  imports: [
    TranslateModule,
    FiltroUsuariosComponent
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchCustomComponent {

  constructor(
    private translate: TranslateService
  ) {}


}
