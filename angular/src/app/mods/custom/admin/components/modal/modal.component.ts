import { Component, ElementRef, EventEmitter, Input, Output, Renderer2 } from '@angular/core';
import { CrearDummieComponent } from './components/crear-dummie/crear-dummie.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-custom-modal',
  standalone: true,
  imports: [
    TranslateModule,
    CrearDummieComponent,
    FormsModule
  ],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss',
})
export class ModalCustomComponent {

  @Input() theme: string = ''

  private themeListener!: (event: any) => void;

  _jsonModalData: any = {};

  @Output() jsonModalChanges = new EventEmitter<any>();

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
  set json_modal(value: any) {
    if (value) {
      this._jsonModalData = {
        light: {
          fieldset_line_color: value.light.fieldset_line_color || value.light || '#000000',
          legend_text_color: value.light.legend_text_color || value.light || '#000000',
          label_text_color: value.light.label_text_color || value.light || '#000000',
          head_text_color: value.light.head_text_color || value.light || '#000000',
          head_background_color: value.light.head_background_color || value.light || '#000000',
          back_color_background: value.light.back_color_background || value.light || '#000000',
          body_text_color: value.light.body_text_color || value.light || '#000000',
          body_background_color: value.light.body_background_color || value.light || '#000000',
          button_cancel_background_color: value.light.button_cancel_background_color || value.light || '#000000',
          button_cancel_text_color: value.light.button_cancel_text_color || value.light || '#000000',
          button_save_background_color: value.light.button_save_background_color || value.light || '#000000',
          button_save_text_color: value.light.button_save_text_color || value.light || '#000000',
          button_update_background_color: value.light.button_update_background_color || value.light || '#000000',
          button_update_text_color: value.light.button_update_text_color || value.light || '#000000',
          footer_text_color: value.light.footer_text_color || value.light || '#000000',
          footer_background_color: value.light.footer_background_color || value.light || '#000000'
        },
        dark: {
          fieldset_line_color: value.light.fieldset_line_color || value.light || '#000000',
          legend_text_color: value.light.legend_text_color || value.light || '#000000',
          label_text_color: value.light.label_text_color || value.light || '#000000',
          head_text_color: value.light.head_text_color || value.light || '#000000',
          head_background_color: value.light.head_background_color || value.light || '#000000',
          back_color_background: value.light.back_color_background || value.light || '#000000',
          body_text_color: value.light.body_text_color || value.light || '#000000',
          body_background_color: value.light.body_background_color || value.light || '#000000',
          button_cancel_background_color: value.light.button_cancel_background_color || value.light || '#000000',
          button_cancel_text_color: value.light.button_cancel_text_color || value.light || '#000000',
          button_save_background_color: value.light.button_save_background_color || value.light || '#000000',
          button_save_text_color: value.light.button_save_text_color || value.light || '#000000',
          button_update_background_color: value.light.button_update_background_color || value.light || '#000000',
          button_update_text_color: value.light.button_update_text_color || value.light || '#000000',
          footer_text_color: value.light.footer_text_color || value.light || '#000000',
          footer_background_color: value.light.footer_background_color || value.light || '#000000'
        }
      };
      
      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_modal(): any {
    return this._jsonModalData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonModalData[this.theme];

    if (temaActual) {
      const container = this.elRef.nativeElement.querySelector('.card-preview-container');

      if (container) {
        const estilosCss = `
          --modal_custom-fieldset_line_color: ${temaActual.fieldset_line_color};
          --modal_custom-legend_text_color: ${temaActual.legend_text_color};
          --modal_custom-label_text_color: ${temaActual.label_text_color};
          --modal_custom-head_text_color: ${temaActual.head_text_color};
          --modal_custom-head_background_color: ${temaActual.head_background_color};
          --modal_custom-back_color_background: ${temaActual.back_color_background};
          --modal_custom-body_text_color: ${temaActual.body_text_color};
          --modal_custom-body_background_color: ${temaActual.body_background_color};
          --modal_custom-button_cancel_background_color: ${temaActual.button_cancel_background_color};
          --modal_custom-button_cancel_text_color: ${temaActual.button_cancel_text_color};
          --modal_custom-button_save_background_color: ${temaActual.button_save_background_color};
          --modal_custom-button_save_text_color: ${temaActual.button_save_text_color};
          --modal_custom-button_update_background_color: ${temaActual.button_update_background_color};
          --modal_custom-button_update_text_color: ${temaActual.button_update_text_color};
          --modal_custom-footer_text_color: ${temaActual.footer_text_color};
          --modal_custom-footer_background_color: ${temaActual.footer_background_color};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }
  }
}
