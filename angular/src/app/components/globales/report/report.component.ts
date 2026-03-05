import { CommonModule } from '@angular/common';
import { Component, HostListener, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

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

  @Input()
  icon: string = 'fa fa-file';  

  isReportVisible: boolean = false;
  clickeado:boolean = false

  contador = 0

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'r') {
    //   event.preventDefault();
    //   this.openFilterMinimize();
    // }
  }

  async openFilterMinimize() {
    // let componente = await this.listaDeComponentes.obtenerComponentePorNombre(this.componente);
    
    // if(componente){
    //   const factory = await this.resolver.resolveComponentFactory(componente.componente);
    //   this.clickeado = !this.clickeado
    //   if(this.clickeado == true){
    //     this.contenedorDinamico.clear()
    //     this.contenedorDinamico.createComponent(factory);
    //     this.isFilterVisible = true
    //   }else{
    //     this.filtroItem.emit()
    //     this.isFilterVisible = false
    //   }
    // }else{
    //   const mensaje = this.translate.instant('global-search.CONSOLE_ERROR_NOT_FOUND_COMPONENT')
    //   console.error(mensaje)
    // }
    this.isReportVisible = !this.isReportVisible
  }  

  async openReportMinimize() {
    this.isReportVisible = !this.isReportVisible
  }  

  async closeReport(){
    this.isReportVisible = false
  }

}
