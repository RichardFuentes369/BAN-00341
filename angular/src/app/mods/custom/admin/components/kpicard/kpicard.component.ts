import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
@Component({
  selector: 'app-custom-kpicard',
  standalone: true,
  imports: [TranslateModule, FormsModule],
  templateUrl: './kpicard.component.html',
  styleUrl: './kpicard.component.scss',
})
export class KpicardCustomComponent implements OnInit, OnDestroy {

  title = 'Titulo contador'
  displayValue = 200
  img = 'assets/images/img_actived.png'

  @Input() theme: string = ''

  private themeListener!: (event: any) => void;

  _jsonKpiData: any = {};

  @Output() jsonKpiChanges = new EventEmitter<any>();

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
  set json_kpi(value: any) {
    if (value) {
      this._jsonKpiData = {
        light: {
          background_color: value.light?.background_color || value.light?.text || '#000000',
          icon_color: value.light?.icon_color || value.light?.placeholder || '#cccccc',
          border_line_color: value.light?.border_line_color || value.light?.bg || '#ffffff',
          text_color: value.light?.text_color || value.light?.placeholder || '#cccccc',
          text_number_color: value.light?.text_number_color || value.light?.border || '#000000'
        },
        dark: {
          background_color: value.dark?.background_color || value.dark?.text || '#000000',
          icon_color: value.light?.icon_color || value.light?.placeholder || '#cccccc',
          border_line_color: value.dark?.border_line_color || value.dark?.bg || '#ffffff',
          text_color: value.dark?.text_color || value.dark?.placeholder || '#cccccc',
          text_number_color: value.dark?.text_number_color || value.dark?.border || '#000000'
        }
      };
      
      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_kpi(): any {
    return this._jsonKpiData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonKpiData[this.theme];

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --kpicard_custom-background_color: ${temaActual.background_color};
          --kpicard_custom-icon_color: ${temaActual.icon_color};
          --kpicard_custom-border_line_color: ${temaActual.border_line_color};
          --kpicard_custom-text_color: ${temaActual.text_color};
          --kpicard_custom-text_number_color: ${temaActual.text_number_color};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }
  }
}