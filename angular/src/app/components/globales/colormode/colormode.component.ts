import { Component, OnInit } from '@angular/core';
import * as themeData from '../../../../../custom/custom.json';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-globales-colormode',
  standalone: true,
  templateUrl: './colormode.component.html',
  styleUrl: './colormode.component.scss'
})
export class ColormodeComponent implements OnInit {

  // construcator
  constructor(
    private _cookies: CookieService,
  ) { }

  isDarkMode: boolean = false;

  private localConfig = localStorage.getItem('custom_system');
  private getStoredConfig() {
    const localConfig = localStorage.getItem('custom_system');
    if (!localConfig) return themeData;

    try {
      return JSON.parse(localConfig);
    } catch (e) {
      console.warn('El valor en localStorage para custom_system estaba corrupto, usando themeData por defecto.');
      return themeData;
    }
  }

  private config: any = this.getStoredConfig();

  async ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);

    const evento = new CustomEvent('themeChanged', { detail: savedTheme });
    window.dispatchEvent(evento);

    this.loadCustom()
  }

  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);

    const evento = new CustomEvent('themeChanged', { detail: theme });
    window.dispatchEvent(evento);

    localStorage.setItem('theme', theme);
    this.loadCustom()
  };

  loadCustom(): void {
    const theme = localStorage.getItem('theme') || 'light';

    // Ahora TypeScript sabe que 'theme' es string y no null
    const tema = this.config[theme];

    if (!tema) {
      console.warn(`El modo ${theme} no existe en la configuración.`);
      return;
    }

    const root = document.documentElement;

    const procesarEstilos = (obj: any, prefijo: string = '--') => {
      for (const key in obj) {
        const nuevaClave = prefijo + (prefijo === '--' ? key : `-${key}`);

        if (typeof obj[key] === 'object' && obj[key] !== null) {
          procesarEstilos(obj[key], nuevaClave);
        } else {
          document.documentElement.style.setProperty(nuevaClave, obj[key]);
        }
      }
    };

    procesarEstilos(tema, '--');
  }
}

