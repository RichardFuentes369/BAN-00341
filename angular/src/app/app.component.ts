
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet  } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { VarsService } from '@service/globales/vars/vars.service';
import { CookieService } from 'ngx-cookie-service';
import * as themeData from '../../custom/custom.json';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet
],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  title = 'angular';                                                                                                         

  constructor(
    private translate: TranslateService,
    private _cookies: CookieService,
    private router: Router,
    private varsService :VarsService
  ){
    this._cookies.delete('languague')
    this._cookies.set('languague', 'es')
    this.translate.use('es');
  }

  async ngOnInit() {

    const response = await this.varsService.obtenerJson('custom_system') as any
    if (response?.valor) {
      localStorage.setItem('custom_system', response.valor);
    }else{
      localStorage.setItem('custom_system', JSON.stringify(themeData));
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

}
