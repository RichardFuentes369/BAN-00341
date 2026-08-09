import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-menu',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuCustomComponent implements OnInit, OnDestroy {

  @Input() theme: string = ''
  img1 = 'assets/images/img_users.png'
  img2 = 'assets/images/img_catalog.png'

  private themeListener!: (event: any) => void;

  _jsonMenutData: any = {};

  @Output() jsonMenuChanges = new EventEmitter<any>();

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  ngOnInit() {
    this.aplicarEstilosVisuales();

    this.themeListener = (event: CustomEvent) => {
      if (event.detail) {
        this.theme = event.detail;
        this.aplicarEstilosVisuales();
      }
    };

    window.addEventListener('themeChanged', this.themeListener as EventListener);
  }

  ngOnDestroy() {
    if (this.themeListener) {
      window.removeEventListener('themeChanged', this.themeListener as EventListener);
    }
  }

  @Input()
  set json_menu(value: any) {
    if (value) {
      this._jsonMenutData = {
        light: {
          text_color: value.light?.text_color || value.light?.bg || '#ffffff',
          icon_color: value.light?.icon_color || value.light?.label || '#000000',
          background_card_color: value.light?.background_card_color || value.light?.text || '#000000',
          hover_card_color: value.light?.hover_card_color || value.light?.label || '#000000',
        },
        dark: {
          text_color: value.light?.text_color || value.light?.bg || '#ffffff',
          icon_color: value.light?.icon_color || value.light?.label || '#000000',
          background_card_color: value.light?.background_card_color || value.light?.text || '#000000',
          hover_card_color: value.light?.hover_card_color || value.light?.label || '#000000',
        }
      };
      
      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_menu(): any {
    return this._jsonMenutData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonMenutData[this.theme];

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --card_menu_custom-text_color: ${temaActual.text_color};
          --card_menu_custom-icon_color: ${temaActual.icon_color};
          --card_menu_custom-background_card_color: ${temaActual.background_card_color};
          --card_menu_custom-hover_card_color: ${temaActual.hover_card_color};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }
  }
}
