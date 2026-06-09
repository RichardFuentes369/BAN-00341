import { Component, OnInit } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { EditarUsuarioComponent } from '../../components/editar-usuario/editar-usuario.component';
@Component({
  selector: 'app-mod-me-admin-pages-settings',
  standalone: true,
  imports: [TranslateModule, EditarUsuarioComponent],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class MeAdminPageSettingsComponent {

}
