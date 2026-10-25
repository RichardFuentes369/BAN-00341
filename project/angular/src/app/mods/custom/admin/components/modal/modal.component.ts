import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
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
export class ModalCustomComponent implements OnInit, OnDestroy {

  @Input() theme: string = '';

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
          fieldset_line_color: value.light?.fieldset_line_color || '#8998A3',
          legend_text_color: value.light?.legend_text_color || '#0b4a75',
          label_text_color: value.light?.label_text_color || '#000000',
          head_text_color: value.light?.head_text_color || '#FFFFFF',
          head_background_color: value.light?.head_background_color || '#0b4a75',
          back_color_background: value.light?.back_color_background || '#FFFFFF',
          body_text_color: value.light?.body_text_color || '#948F8F',
          body_background_color: value.light?.body_background_color || '#FFFFFF',
          button_cancel_background_color: value.light?.button_cancel_background_color || '#8A8484',
          button_cancel_text_color: value.light?.button_cancel_text_color || '#FFFFFF',
          button_save_background_color: value.light?.button_save_background_color || '#059669',
          button_save_text_color: value.light?.button_save_text_color || '#FFFFFF',
          button_update_background_color: value.light?.button_update_background_color || '#3B82F6',
          button_update_text_color: value.light?.button_update_text_color || '#FFFFFF',
          footer_text_color: value.light?.footer_text_color || '#948F8F',
          footer_background_color: value.light?.footer_background_color || '#EDEDED'
        },
        dark: {
          fieldset_line_color: value.dark?.fieldset_line_color || '#0b4a75',
          legend_text_color: value.dark?.legend_text_color || '#FFFFFF',
          label_text_color: value.dark?.label_text_color || '#FFFFFF',
          head_text_color: value.dark?.head_text_color || '#FFFFFF',
          head_background_color: value.dark?.head_background_color || '#242323',
          back_color_background: value.dark?.back_color_background || '#2B2A2A',
          body_text_color: value.dark?.body_text_color || '#948F8F',
          body_background_color: value.dark?.body_background_color || '#2B2A2A',
          button_cancel_background_color: value.dark?.button_cancel_background_color || '#8A8484',
          button_cancel_text_color: value.dark?.button_cancel_text_color || '#FFFFFF',
          button_save_background_color: value.dark?.button_save_background_color || '#047857',
          button_save_text_color: value.dark?.button_save_text_color || '#FFFFFF',
          button_update_background_color: value.dark?.button_update_background_color || '#2563EB',
          button_update_text_color: value.dark?.button_update_text_color || '#FFFFFF',
          footer_text_color: value.dark?.footer_text_color || '#948F8F',
          footer_background_color: value.dark?.footer_background_color || '#242323'
        }
      };
      
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
          --modal_custom-fieldset_line_color: ${temaActual.fieldset_line_color || ''};
          --modal_custom-legend_text_color: ${temaActual.legend_text_color || ''};
          --modal_custom-label_text_color: ${temaActual.label_text_color || ''};
          --modal_custom-head_text_color: ${temaActual.head_text_color || ''};
          --modal_custom-head_background_color: ${temaActual.head_background_color || ''};
          --modal_custom-back_color_background: ${temaActual.back_color_background || ''};
          --modal_custom-button_cancel_background_color: ${temaActual.button_cancel_background_color || ''};
          --modal_custom-button_cancel_text_color: ${temaActual.button_cancel_text_color || ''};
          --modal_custom-button_save_background_color: ${temaActual.button_save_background_color || ''};
          --modal_custom-button_save_text_color: ${temaActual.button_save_text_color || ''};
          --modal_custom-button_update_background_color: ${temaActual.button_update_background_color || ''};
          --modal_custom-button_update_text_color: ${temaActual.button_update_text_color || ''};
          --modal_custom-footer_text_color: ${temaActual.footer_text_color || ''};
          --modal_custom-footer_background_color: ${temaActual.footer_background_color || ''};
        `;
        this.renderer.setProperty(container, 'style', estilosCss);
      }
    }

    // Notificar al padre
    this.jsonModalChanges.emit(this._jsonModalData);
  }
}