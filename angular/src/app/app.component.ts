
import { Component, NgZone, OnInit } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core'
import { VarsService } from '@service/globales/vars/vars.service';
import { CookieService } from 'ngx-cookie-service';
import * as themeData from '../../custom/custom.json';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  isExtensionInstalled = false;
  extensionId = 'gplpaadkokahmenbfpbeoglelcmdfbbe';

  title = 'angular';

  constructor(
    private translate: TranslateService,
    private _cookies: CookieService,
    private router: Router,
    private varsService: VarsService,
    private ngZone: NgZone
  ) {
    this._cookies.delete('languague')
    this._cookies.set('languague', 'es')
    this.translate.use('es');
  }

  async ngOnInit() {
    this.checkExtension();
    const response = await this.varsService.obtenerJson('custom_system') as any
    if (response?.valor) {
      localStorage.setItem('custom_system', response.valor);
    } else {
      localStorage.setItem('custom_system', JSON.stringify(themeData));
    }

    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        window.scrollTo(0, 0);
      }
    });
  }

  checkExtension() {
    const win = window as any;
    const isChromium = win.chrome;

    // 1. Si NO es Chromium (ej. Firefox), ocultamos la advertencia por completo
    if (!isChromium) {
      this.ngZone.run(() => {
        this.isExtensionInstalled = true; // Esto evita que se muestre el mensaje en Firefox
      });
      return;
    }

    // 2. Si SÍ es Chromium (Chrome, Edge, Brave...), SÍ validamos la extensión
    if (win.chrome.runtime && win.chrome.runtime.sendMessage) {
      win.chrome.runtime.sendMessage(
        this.extensionId,
        { action: 'ping' },
        (response: any) => {
          this.ngZone.run(() => {
            if (!win.chrome.runtime.lastError && response) {
              this.isExtensionInstalled = true;  // Está instalada (sin advertencia en Chrome)
            } else {
              this.isExtensionInstalled = false; // NO está instalada -> ¡MUESTRA la advertencia en Chrome!
            }
          });
        }
      );
    } else {
      this.ngZone.run(() => {
        this.isExtensionInstalled = false; // Si hay dudas en Chromium, muestra la advertencia
      });
    }
  }

}
