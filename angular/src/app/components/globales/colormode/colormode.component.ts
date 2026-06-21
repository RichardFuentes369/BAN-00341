import { Component, OnInit } from '@angular/core';
import * as themeData from '../../../../../custom/custom.json';

@Component({
  selector: 'app-globales-colormode',
  standalone: true,
  templateUrl: './colormode.component.html',
  styleUrl: './colormode.component.scss'
})
export class ColormodeComponent implements OnInit {
  isDarkMode: boolean = false;

  private config: any = (themeData as any).default || themeData;

  ngOnInit() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.isDarkMode = savedTheme === 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    this.loadCustom()
  }

  toggleTheme = () => {
    this.isDarkMode = !this.isDarkMode;
    const theme = this.isDarkMode ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', theme);
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

