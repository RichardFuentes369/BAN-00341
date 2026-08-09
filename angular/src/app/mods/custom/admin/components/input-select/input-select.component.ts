import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-custom-inputselect',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './input-select.component.html',
  styleUrl: './input-select.component.scss',
})
export class InputSelectCustomComponent implements OnInit, OnDestroy {

  @Input() theme: string = ''

  private themeListener!: (event: any) => void;

  _jsonInputData: any = {};

  @Output() jsonInputChanges = new EventEmitter<any>();

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
  set json_input(value: any) {
    if (value) {
      this._jsonInputData = {
        light: {
          background_color: value.light?.background_color || value.light?.bg || '#ffffff',
          text_color: value.light?.text_color || value.light?.text || '#000000',
          text_color_placeholder: value.light?.text_color_placeholder || value.light?.placeholder || '#cccccc',
          border_color: value.light?.border_color || value.light?.border || '#000000',
          label_color: value.light?.label_color || value.light?.label || '#000000'
        },
        dark: {
          background_color: value.dark?.background_color || value.dark?.bg || '#000000',
          text_color: value.dark?.text_color || value.dark?.text || '#ffffff',
          text_color_placeholder: value.dark?.text_color_placeholder || value.dark?.placeholder || '#666666',
          border_color: value.dark?.border_color || value.dark?.border || '#ffffff',
          label_color: value.dark?.label_color || value.dark?.label || '#ffffff'
        }
      };
      
      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_input(): any {
    return this._jsonInputData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonInputData[this.theme];

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --input_custom-background_color: ${temaActual.background_color};
          --input_custom-label_color: ${temaActual.label_color};
          --input_custom-text_color: ${temaActual.text_color};
          --input_custom-text_color_placeholder: ${temaActual.text_color_placeholder};
          --input_custom-border_color: ${temaActual.border_color};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }
  }
}