import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, Output, EventEmitter, Renderer2, OnDestroy } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaComponentes } from '@mod/lista-componentes';
import { WORD_KEY_COMPONENT_GLOBAL, WORD_KEY_ID_MI_BOTON_GLOBAL } from '@const/app.const';

@Component({
  selector: 'app-globales-modal-boostrap',
  standalone: true,
  imports: [TranslateModule, CommonModule],
  templateUrl: './boostrap.component.html',
  styleUrl: './boostrap.component.scss'
})
export class ModalBoostrapComponent implements OnDestroy {
  public WORD_KEY_ID_MI_BOTON_GLOBAL = WORD_KEY_ID_MI_BOTON_GLOBAL;
  @ViewChild('contenedor', { read: ViewContainerRef, static: true }) contenedor!: ViewContainerRef;

  @Input() tamano: string = '';
  @Input() scrollable: boolean = false;
  @Input() title: string = '';
  @Input() subtitle: string = '';
  @Input() cancel: boolean = false;
  @Input() buttonCancel: string = '';
  @Input() save: boolean = false;
  @Input() buttonSave: string = '';
  @Input() edit: boolean = false;
  @Input() buttonEdit: string = '';
  @Input() componentePrecargado: string = '';
  @Input() cierreModal: string = "static";

  paramsRespaldo: any;
  listaDeComponentes = new ListaComponentes();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {}

  async openModal() {
    const boton = document.getElementById(this.WORD_KEY_ID_MI_BOTON_GLOBAL) as HTMLButtonElement;
    const metodoClickeado = boton?.getAttribute(WORD_KEY_COMPONENT_GLOBAL);

    this.paramsRespaldo = { ...this.route.snapshot.queryParams };
    
    if (metodoClickeado) {
      let componente = await this.listaDeComponentes.obtenerComponentePorNombre(metodoClickeado);
      const factory = this.resolver.resolveComponentFactory(componente.componente);
      this.contenedor.clear();
      this.contenedor.createComponent(factory);

      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        this.renderer.appendChild(document.body, modalElement);
        this.renderer.setStyle(modalElement, 'display', 'block');
        this.renderer.addClass(document.body, 'modal-open');

        setTimeout(() => {
          this.renderer.addClass(modalElement, 'show');
        }, 20);
      }
    }
  }

  async buttonCloseM() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      this.renderer.removeClass(modalElement, 'show');
      
      setTimeout(() => {
        this.renderer.setStyle(modalElement, 'display', 'none');
        this.renderer.removeClass(document.body, 'modal-open');
        if (this.paramsRespaldo) {
          this.router.navigate([], { queryParams: this.paramsRespaldo });
        }
      }, 300);
    }
  }

  @Output() actualizarTabla = new EventEmitter<string>();

  async buttonSaveM() {
    const boton = document.querySelector('.btnAction') as HTMLButtonElement;
    if (boton) {
      boton.click();
      this.actualizarTabla.emit();
      this.buttonCloseM();
    }
  }

  async buttonUpdateM() {
    const boton = document.querySelector('.btnAction') as HTMLButtonElement;
    if (boton) {
      await boton.click();
      this.actualizarTabla.emit();
      this.buttonCloseM();
    }
  }

  ngOnDestroy() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement && modalElement.parentNode === document.body) {
      this.renderer.removeChild(document.body, modalElement);
    }
    this.renderer.removeClass(document.body, 'modal-open');
  }
}