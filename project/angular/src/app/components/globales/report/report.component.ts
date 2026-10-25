import { CommonModule } from '@angular/common';
import { Component, ComponentFactoryResolver, EventEmitter, HostListener, Input, Output, ViewChild, ViewContainerRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaComponentes } from '@mod/lista-componentes';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-globales-report',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './report.component.html',
  styleUrl: './report.component.scss',
})
export class ReportComponent {
  @ViewChild('contenedorReport', { read: ViewContainerRef }) contenedorDinamico!: ViewContainerRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService
  ) {}

  listaDeComponentes = new ListaComponentes();

  @Input()
  icon: string = 'fa fa-file-download';  
  @Input()
  componente: string = '';  

  isReportVisible: boolean = false;
  clickeado:boolean = false

  contador = 0

  @Output()
  reportItem = new EventEmitter<string>()

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r') {
    //   event.preventDefault();
    //   this.openFilterMinimize();
    // }
  }

  async openReportMinimize() {
    let componente = await this.listaDeComponentes.obtenerComponentePorNombre(this.componente);
    
    if(componente){
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.clickeado = !this.clickeado
      if(this.clickeado == true){
        this.contenedorDinamico.clear()
        const componentRef = this.contenedorDinamico.createComponent(factory);
        this.isReportVisible = true
      }else{
        this.isReportVisible = false
      }
    }else{
      const mensaje = this.translate.instant('global-search.CONSOLE_ERROR_NOT_FOUND_COMPONENT')
      console.error(mensaje)
    }
  }

  async closeReport(){
    $('.limpiarR').click()
    this.clickeado = !this.clickeado
    this.isReportVisible = false
  }

  async clearReport(){
    $('.limpiarR').click()
  }

  async generar(formato: 'excel' | 'csv') {
    (formato == 'excel') ? $('.excel').click() : $('.csv').click()
    this.reportItem.emit(formato)
  }  

}
