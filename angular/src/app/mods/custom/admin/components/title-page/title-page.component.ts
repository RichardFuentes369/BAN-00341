import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
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
export class TitlePageCustomComponent implements OnInit, OnDestroy {

  imgAdmin = 'assets/images/img_admin.png';

  @Input() theme: string = '';
  _jsonTitlePageData: any = {};
  
  // Renombrado adecuadamente el Output
  @Output() jsonTitlePageChanges = new EventEmitter<any>();

  private themeListener!: (event: any) => void;

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
  set json_titple_page(value: any) {
    if (value) {
      this._jsonTitlePageData = {
        light: {
          background_card_color: value.light?.background_card_color || '#FFFFFF',
          icon_color: value.light?.icon_color || '#000000',
          text_color: value.light?.text_color || '#000000',
          line_color: value.light?.line_color || '#000000',
        },
        dark: {
          background_card_color: value.dark?.background_card_color || '#2b2a2a',
          icon_color: value.dark?.icon_color || '#FFFFFF',
          text_color: value.dark?.text_color || '#FFFFFF',
          line_color: value.dark?.line_color || '#FFFFFF',
        }
      };

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
          --title_page_custom-background_card_color: ${temaActual.background_card_color || ''};
          --title_page_custom-icon_color: ${temaActual.icon_color || ''};
          --title_page_custom-text_color: ${temaActual.text_color || ''};
          --title_page_custom-line_color: ${temaActual.line_color || ''};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }

    // Notificar al padre
    this.jsonTitlePageChanges.emit(this._jsonTitlePageData);
  }
}