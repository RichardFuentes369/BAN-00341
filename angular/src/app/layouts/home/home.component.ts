import { Component, OnInit, HostListener, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { isPlatformBrowser, CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { Router, NavigationEnd, Event, RouterModule } from '@angular/router';
import { filter } from 'rxjs/operators';

import { NAME_PAGE, LAYOUT_HOME_PAGE_START, LAYOUT_HOME_PAGE_LOGIN_FINAL, LAYOUT_HOME_PAGE_LOGIN_ADMIN } from '@layout/const/layouts.const';
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';
import { VarsService } from '@service/globales/vars/vars.service';
import { FullscreenComponent } from '@component/globales/fullscreem/fullscreen.component';
import { STORAGE_KEY_THEME } from '@const/app.const';

@Component({
  selector: 'app-layout-home',
  standalone: true,
  imports: [
    CommonModule,
    IdiomaComponent,
    FullscreenComponent,
    TranslateModule,
    ColormodeComponent,
    RouterModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  public CURRENT_YEAR = new Date().getFullYear();
  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_HOME_PAGE_START = LAYOUT_HOME_PAGE_START;
  public LAYOUT_HOME_PAGE_LOGIN_ADMIN = LAYOUT_HOME_PAGE_LOGIN_ADMIN;
  public LAYOUT_HOME_PAGE_LOGIN_FINAL = LAYOUT_HOME_PAGE_LOGIN_FINAL;

  @ViewChild(ColormodeComponent) colorModeComponent!: ColormodeComponent;

  urlLogoUts = 'assets/images/_uts.jpeg'
  nameApp: string = ''
  banner: string = ''
  isScrolled = false;
  showRouteIngreso: boolean = true;

  constructor(
    private translate: TranslateService, 
    private router: Router,
    private varsService: VarsService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // Escuchamos el evento de scroll directamente en el contenedor que lo genera
  @HostListener('scroll', ['$event'])
  onScroll(event: any) {
    if (event.target.id === 'content-wrapper') {
      const scrollPos = event.target.scrollTop;
      
      // Umbrales diferenciados para evitar fallos de parpadeo
      if (!this.isScrolled && scrollPos > 80) {
        this.isScrolled = true;
      } else if (this.isScrolled && scrollPos < 10) {
        this.isScrolled = false;
      }
    }
  }

  async ngOnInit() {
    setTimeout(() => {
      if (this.colorModeComponent) {
        localStorage.setItem(STORAGE_KEY_THEME,'light')
        this.colorModeComponent.loadCustom(); 
        console.log('aqui estoy')
      }
    });
    
    this.verificarRuta(this.router.url);
    this.router.events.pipe(
      filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.verificarRuta(event.urlAfterRedirects);
    });

    const response1 = await this.varsService.obtenerVar('AppName') as any;
    if (response1?.data?.valor) {
      this.nameApp = response1.data.valor;
    }
    const response2 = await this.varsService.obtenerVar('BannerBienvenida') as any;
    if (response2?.data?.valor) {
      this.banner = response2.data.valor;
    }
  }

  private verificarRuta(url: string) {
    this.showRouteIngreso = !url.includes('ingreso/admin');
  }

  idiomaCambiar(valor: string) {
    this.translate.use(valor);
  }
}