import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-title-page',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    FormsModule,
  ],
  templateUrl: './title-page.component.html',
  styleUrl: './title-page.component.scss',
})
export class TitlePageCustomComponent {

  imgAdmin = 'assets/images/img_admin.png'

  @Input() theme: string = ''
  _jsonTitlePageData: any = {};
  @Output() jsonKpiChanges = new EventEmitter<any>();
  mostrarCards = true;

  constructor(private renderer: Renderer2, private elRef: ElementRef) { }

  @Input()
  set json_titple_page(value: any) {
    if (value) {
      this._jsonTitlePageData = {
        light: {
          background_card_color: value.light?.background_card_color || value.light?.background_card_color || '#000000',
          icon_color: value.light?.icon_color || value.light?.icon_color || '#cccccc',
          text_color: value.light?.text_color || value.light?.text_color || '#ffffff',
          line_color: value.light?.line_color || value.light?.line_color || '#cccccc',
        },
        dark: {
          background_card_color: value.dark?.background_card_color || value.dark?.background_card_color || '#000000',
          icon_color: value.dark?.icon_color || value.dark?.icon_color || '#cccccc',
          text_color: value.dark?.text_color || value.dark?.text_color || '#ffffff',
          line_color: value.dark?.line_color || value.dark?.line_color || '#cccccc',
        }
      };

      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_titple_page(): any {
    return this._jsonTitlePageData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonTitlePageData[this.theme];

    if (temaActual) {
    const container = this.elRef.nativeElement.querySelector('.card-preview-container');

    if (container) {
      const estilosCss = `
        --title_page_custom-background_card_color: ${temaActual.background_card_color};
        --title_page_custom-icon_color: ${temaActual.icon_color};
        --title_page_custom-text_color: ${temaActual.text_color};
        --title_page_custom-line_color: ${temaActual.line_color};
      `;
      this.renderer.setProperty(container, 'style', estilosCss);
    }
    }
  }

}
