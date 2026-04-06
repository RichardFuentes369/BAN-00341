import { Component } from '@angular/core';
import { AvatarComponent } from '@component/globales/avatar/avatar.component';
import { DropzoneComponent } from '@component/globales/dropzone/dropzone.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mod-me-admin-pages-settings',
  standalone: true,
  imports: [AvatarComponent, DropzoneComponent, TranslateModule],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
})
export class MeAdminPageSettingsComponent {

}
