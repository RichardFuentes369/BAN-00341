import { CommonModule } from '@angular/common';
import { Component, Input, ViewChild, ViewContainerRef, ComponentFactoryResolver, OnInit, Output, EventEmitter, ElementRef, AfterViewInit, HostListener } from '@angular/core';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

import { ListaComponentes } from '@mod/lista-componentes'
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-globales-search',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
  ],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss'
})
export class SearchComponent implements OnInit{
  @ViewChild('contenedorFilter', { read: ViewContainerRef }) contenedorDinamico!: ViewContainerRef;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private resolver: ComponentFactoryResolver,
    private translate: TranslateService
  ) {}

  listaDeComponentes = new ListaComponentes();

  oldParams = ''

  @Input()
  icon: string = 'fa fa-filter';  
  @Input()
  componente: string = '';  
  
  isFilterVisible: boolean = false;
  clickeado:boolean = false

  contador = 0

  @Output()
  filtroItem = new EventEmitter<string>()

  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'f') {
    //   event.preventDefault();
    //   this.openFilterMinimize();
    // }
  }


  ngOnInit() {
    console.log(this.route.snapshot.queryParams)
  }

  async openFilterMinimize() {
    let componente = await this.listaDeComponentes.obtenerComponentePorNombre(this.componente);
    
    if(componente){
      const factory = await this.resolver.resolveComponentFactory(componente.componente);
      this.clickeado = !this.clickeado
      if(this.clickeado == true){
        this.contenedorDinamico.clear()
        this.contenedorDinamico.createComponent(factory);
        this.isFilterVisible = true
      }else{
        this.filtroItem.emit()
        this.isFilterVisible = false
      }
    }else{
      const mensaje = this.translate.instant('global-search.CONSOLE_ERROR_NOT_FOUND_COMPONENT')
      console.error(mensaje)
    }
  }  

  async clearFilter(){
    $('.limpiarS').click()
    this.filtroItem.emit()
    this.contador = await sessionStorage.length
    if (this.route.snapshot.queryParams['search']) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { 
          search: null
        },
        queryParamsHandling: 'merge',
        replaceUrl: true 
      });
    }
  }
  
  async closeFilterEraser(){
    $('.limpiarS').click()
    this.clickeado = !this.clickeado
    this.filtroItem.emit()
    this.isFilterVisible = false
    this.contador = await sessionStorage.length
    if (this.route.snapshot.queryParams['search']) {
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { 
          search: null
        },
        queryParamsHandling: 'merge',
        replaceUrl: true 
      });
    }
  }

  async actionFilter(){
    $('.filtrar').click()
    this.filtroItem.emit()
    this.contador = await sessionStorage.length
  }

}
