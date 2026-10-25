import { Component } from '@angular/core';
import { LoginComponent } from '@component/globales/login/login.component';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-mod-main-login',
  standalone: true,
  imports: [
    LoginComponent,
    TranslateModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class MainLoginComponent {

}
