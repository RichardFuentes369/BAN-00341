import { Component, ElementRef, Input, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { GridcrudCustomComponent } from './components/gridcrud/gridcrud.component';
import { TablecrudCustomComponent } from './components/tablecrud/tablecrud.component';

@Component({
  selector: 'app-custom-gridtable',
  standalone: true,
  imports: [TranslateModule, FormsModule, GridcrudCustomComponent, TablecrudCustomComponent],
  templateUrl: './gridtable.component.html',
  styleUrl: './gridtable.component.scss',
})
export class GridtableCustomComponent {

  @Input() theme: string = ''

  private themeListener!: (event: any) => void;

  _jsonGridTableCrudData: any = {};

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
  set json_grid_table(value: any) {
    if (value) {
      this._jsonGridTableCrudData = {
        light: {
          text_color: value.light?.text_color || value.light?.bg || '#ffffff',
          icon_color: value.light?.icon_color || value.light?.label || '#000000',
          background_card_color: value.light?.background_card_color || value.light?.text || '#000000',
          hover_card_color: value.light?.hover_card_color || value.light?.label || '#000000',
        },
        dark: {
          text_color: value.dark?.text_color || value.dark?.bg || '#ffffff',
          icon_color: value.dark?.icon_color || value.dark?.label || '#000000',
          background_card_color: value.dark?.background_card_color || value.dark?.text || '#000000',
          hover_card_color: value.dark?.hover_card_color || value.dark?.label || '#000000',
        }
      };

      // Aplicar estilos inmediatamente al recibir el input
      this.aplicarEstilosVisuales();
    }
  }

  get json_grid_table(): any {
    return this._jsonGridTableCrudData;
  }

  aplicarEstilosVisuales() {
    const temaActual = this._jsonGridTableCrudData[this.theme];

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
