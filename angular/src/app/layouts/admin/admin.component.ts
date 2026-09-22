import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, HostListener, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

import { BreadcrumbsComponent } from '@component/globales/breadcrumb/breadcrumb.component';
import { IdiomaComponent } from '@component/globales/idioma/idioma.component';
import { ColormodeComponent } from '@component/globales/colormode/colormode.component';
import { NotificationComponent } from '@component/globales/notification/notification.component';
import { FullscreenComponent } from '@component/globales/fullscreem/fullscreen.component';

import { STORAGE_KEY_ADMIN_AUTH, STORAGE_KEY_TOKEN_ADMIN, STORAGE_KEY_TOKEN_FINAL } from '@const/app.const';
import { NAME_PAGE, LAYOUT_ADMIN_PAGE_LOGOUT, LAYOUT_PAGE_PROFILE, LAYOUT_PAGE_SETTINGS, LAYOUT_PAGE_DASHBOARD, LAYOUT_ADMIN_PAGE_MOD } from '@layout/const/layouts.const';

import {
  ADMIN_PAGE_MENU_PERSMISSION_USERS,
  ADMIN_PAGE_MENU_PERSMISSION_MODULES,
  ADMIN_PAGE_MENU_PERSMISSION_CATALOG,
  ADMIN_PAGE_MENU_PERSMISSION_LOSS,
  ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE,
  LAYOUT_ADMIN_PAGE_USERS,
  LAYOUT_ADMIN_PAGE_MODULES,
  LAYOUT_ADMIN_PAGE_CATALOG,
  LAYOUT_ADMIN_PAGE_LOSS,
  LAYOUT_ADMIN_PAGE_WAREHOUSE,
  LAYOUT_ADMIN_PAGE_MENU,
  ADMIN_PAGE_MENU_PERSMISSION_ALERTS,
  LAYOUT_ADMIN_PAGE_ALERT,
} from '@mod/main/const/main.const';
import { MOD_USER_PAGE_ADMIN, MOD_USER_PAGE_FINAL } from '@mod/users/const/users.const';
import { MOD_CATEGORY_PAGE_BRAND, MOD_CATEGORY_PAGE_EXTENT, MOD_CATEGORY_PAGE_PRODUCT, MOD_CATEGORY_PAGE_SUPPLIER } from '@mod/catalog/const/catalog.const';
import { MOD_MERMA_PAGE_HISTORICO, MOD_MERMA_PAGE_REGISTRO, MOD_MERMA_PAGE_TIPOS } from '@mod/merma/const/loss.conts';
import { MOD_ALERT_PAGE_EXPIRATION, MOD_ALERT_PAGE_STOCK } from '@mod/alerts/const/alerts.const';
import { MOD_SALERETURN_PAGE_SALE } from '@mod/sale_and_return/const/sale_and_return.const';

import { AuthService } from '@guard/service/auth.service';
import { PrincipalService } from '@mod/users/admin/pages/principal/service/principal.service';
import { SettingsService } from '@mod/me/admin/pages/settings/service/settings.service';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { VarService } from '@mod/vars/admin/pages/var/service/var.service';
import { VarsService } from '@service/globales/vars/vars.service';

@Component({
  selector: 'app-layout-admin',
  standalone: true,
  imports: [
    BreadcrumbsComponent,
    ColormodeComponent,
    FullscreenComponent,
    NotificationComponent,
    IdiomaComponent,
    CommonModule,
    TranslateModule,
    RouterModule,
  ],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss',
})
export class AdminComponent implements OnInit, AfterViewInit, OnDestroy {

  public NAME_PAGE = NAME_PAGE;
  public LAYOUT_PAGE_DASHBOARD = LAYOUT_PAGE_DASHBOARD;
  public LAYOUT_PAGE_PROFILE = LAYOUT_PAGE_PROFILE;
  public LAYOUT_PAGE_SETTINGS = LAYOUT_PAGE_SETTINGS;
  public LAYOUT_ADMIN_PAGE_MOD = LAYOUT_ADMIN_PAGE_MOD;
  public CURRENT_YEAR = new Date().getFullYear();

  public ADMIN_PAGE_MENU_PERSMISSION_USERS = ADMIN_PAGE_MENU_PERSMISSION_USERS;
  public MOD_USER_PAGE_ADMIN = MOD_USER_PAGE_ADMIN;
  public MOD_USER_PAGE_FINAL = MOD_USER_PAGE_FINAL;

  public ADMIN_PAGE_MENU_PERSMISSION_CATALOG = ADMIN_PAGE_MENU_PERSMISSION_CATALOG;
  public MOD_CATEGORY_PAGE_PRODUCT = MOD_CATEGORY_PAGE_PRODUCT;
  public MOD_CATEGORY_PAGE_SUPPLIER = MOD_CATEGORY_PAGE_SUPPLIER;
  public MOD_CATEGORY_PAGE_BRAND = MOD_CATEGORY_PAGE_BRAND;
  public MOD_CATEGORY_PAGE_EXTENT = MOD_CATEGORY_PAGE_EXTENT;

  public ADMIN_PAGE_MENU_PERSMISSION_LOSS = ADMIN_PAGE_MENU_PERSMISSION_LOSS;
  public MOD_MERMA_PAGE_TIPOS = MOD_MERMA_PAGE_TIPOS;
  public MOD_MERMA_PAGE_REGISTRO = MOD_MERMA_PAGE_REGISTRO;
  public MOD_MERMA_PAGE_HISTORICO = MOD_MERMA_PAGE_HISTORICO;

  public ADMIN_PAGE_MENU_PERSMISSION_ALERTS = ADMIN_PAGE_MENU_PERSMISSION_ALERTS;
  public MOD_ALERT_PAGE_EXPIRATION = MOD_ALERT_PAGE_EXPIRATION;
  public MOD_ALERT_PAGE_STOCK = MOD_ALERT_PAGE_STOCK;

  public MOD_SALERETURN_PAGE_SALE = MOD_SALERETURN_PAGE_SALE;

  public ADMIN_PAGE_MENU_PERSMISSION_MODULES = ADMIN_PAGE_MENU_PERSMISSION_MODULES;
  public ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE = ADMIN_PAGE_MENU_PERSMISSION_WAREHOUSE;
  public LAYOUT_ADMIN_PAGE_MENU = LAYOUT_ADMIN_PAGE_MENU;
  public LAYOUT_ADMIN_PAGE_USERS = LAYOUT_ADMIN_PAGE_USERS;
  public LAYOUT_ADMIN_PAGE_MODULES = LAYOUT_ADMIN_PAGE_MODULES;
  public LAYOUT_ADMIN_PAGE_WAREHOUSE = LAYOUT_ADMIN_PAGE_WAREHOUSE;
  public LAYOUT_ADMIN_PAGE_LOSS = LAYOUT_ADMIN_PAGE_LOSS;
  public LAYOUT_ADMIN_PAGE_CATALOG = LAYOUT_ADMIN_PAGE_CATALOG;
  public LAYOUT_ADMIN_PAGE_ALERT = LAYOUT_ADMIN_PAGE_ALERT;

  public tipoNavegacion: 'sidebar' | 'navbar' = 'sidebar';
  public navBarHeight: number = 0;
  private _navBarAzulElement?: ElementRef;


  @ViewChild('navBarAzul') set navBarAzul(element: ElementRef | undefined) {
    this._navBarAzulElement = element;
    if (element) {
      this.iniciarObservador(element.nativeElement);
    } else {
      this.destruirObservador();
      this.navBarHeight = 0;
    }
  }

  private resizeObserver?: ResizeObserver;

  minimizarSliderbar: boolean = true;
  nombreModulo: string = '';

  nameApp: string = '';
  firstName: string = '';
  lastName: string = '';

  menu: any[] = [];
  isDarkMode: string = '';

  constructor(
    private router: Router,
    private userService: AuthService,
    private principalService: PrincipalService,
    private translate: TranslateService,
    private settingsService: SettingsService,
    private permisosService: PermisosService,
    private varService: VarService,
    private varsService: VarsService,
    private cdRef: ChangeDetectorRef
  ) { }

  ngAfterViewInit() {
  }

  iniciarObservador(element: HTMLElement) {
    this.destruirObservador();

    if (typeof ResizeObserver !== 'undefined') {
      this.resizeObserver = new ResizeObserver(entries => {
        for (const entry of entries) {
          // Usamos la medida nativa entregada por ResizeObserver
          const newHeight = entry.borderBoxSize?.[0]?.blockSize ?? entry.target.clientHeight;

          // Evitamos errores de Change Detection ejecutando la actualización en el siguiente tick
          queueMicrotask(() => {
            if (this.navBarHeight !== newHeight) {
              this.navBarHeight = newHeight;
              this.cdRef.markForCheck(); // Notifica a Angular del cambio de forma segura
            }
          });
        }
      });

      this.resizeObserver.observe(element);
    }
  }

  destruirObservador() {
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
      this.resizeObserver = undefined;
    }
  }

  ngOnDestroy() {
    this.destruirObservador();
  }

  async ngOnInit() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.closeSidebarOnMobile();
    });

    this.ejecutarInitReal();
    this.settingsService.refreshAction$.subscribe(() => {
      this.ejecutarInitReal();
    });

    const response1 = await this.varsService.obtenerVar('AppName') as any;
    if (response1?.data?.valor) {
      this.nameApp = response1.data.valor;
    }

    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);
    const response = await this.permisosService.listaPermisos(userData.data.id);
    this.menu = response.data;
  }

  async ejecutarInitReal() {
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);
    const response = await this.principalService.getDataUser(userData.data.id);
    const { firstName, lastName } = response.data;
    this.firstName = firstName;
    this.lastName = lastName;
  }

  // Alterna entre la navegación Lateral (Sidebar) y Superior (Navbar)
  cambiarTipoNavegacion(tipo: 'sidebar' | 'navbar'): void {
    // Evitamos ejecutar la transición si ya estamos en el modo seleccionado.
    if (this.tipoNavegacion === tipo) {
      return;
    }

    this.tipoNavegacion = tipo;

    // Cerramos cualquier submenu antes de iniciar la transición.
    this.cerrarTodosLosSubmenus();

    if (tipo === 'sidebar') {
      // El breadcrumb ya no depende de la altura del navbar superior.
      this.navBarHeight = 0;
      return;
    }

    // El navbar permanece en el DOM y se anima mediante CSS.
    // Esperamos dos frames para que el navegador haya aplicado
    // la nueva clase antes de leer su altura real.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const element = this._navBarAzulElement?.nativeElement as HTMLElement | undefined;

        if (element) {
          const newHeight = element.offsetHeight;

          if (this.navBarHeight !== newHeight) {
            this.navBarHeight = newHeight;
            this.cdRef.markForCheck();
          }
        }
      });
    });
  }

  upperFirst(texto: string) {
    if (!texto) return texto;
    return texto.charAt(0).toUpperCase() + texto.slice(1);
  }

  @HostListener('window:themeChanged', ['$event'])
  onThemeChanged(event: Event): void {
    const customEvent = event as CustomEvent;
    this.isDarkMode = customEvent.detail;
  }

  idiomaCambiar(valor: string) {
    this.translate.use(valor);
  }

  cerrarSession() {
    localStorage.removeItem(STORAGE_KEY_TOKEN_ADMIN);
    localStorage.removeItem(STORAGE_KEY_TOKEN_FINAL);
    this.router.navigate([LAYOUT_ADMIN_PAGE_LOGOUT]);
  }

  closeSidebarOnMobile(): void {
    if (window.innerWidth <= 768) {
      const sidebar = document.getElementById('accordionSidebar');
      if (sidebar && !sidebar.classList.contains('toggled')) {
        sidebar.classList.add('toggled');
      }

      this.cerrarTodosLosSubmenus();
      this.minimizarSliderbar = true;
    }
  }

  mostrarMenuLateral() {
    this.minimizarSliderbar = !this.minimizarSliderbar;

    if (this.minimizarSliderbar) {
      this.cerrarTodosLosSubmenus();
    }
  }

  private cerrarTodosLosSubmenus(): void {
    const container = document.getElementById('wrapper');
    if (!container) return;

    const openCollapses = container.querySelectorAll('.collapse.show');
    openCollapses.forEach((el: Element) => {
      el.classList.remove('show');

      const targetId = el.getAttribute('id');
      if (targetId) {
        const trigger = container.querySelector(`[data-target="#${targetId}"]`);
        if (trigger) {
          trigger.classList.add('collapsed');
          trigger.setAttribute('aria-expanded', 'false');
        }
      }
    });
  }

  isRouteActive(routePath: string | any[], exact: boolean = false): boolean {
    if (!routePath) return false;

    const urlTree = Array.isArray(routePath)
      ? this.router.createUrlTree(routePath)
      : this.router.createUrlTree([routePath]);

    return this.router.isActive(urlTree, {
      paths: exact ? 'exact' : 'subset',
      queryParams: 'ignored',
      fragment: 'ignored',
      matrixParams: 'ignored'
    });
  }

  tienePermiso(modulo: string, submodulo?: string, jerarquia: number = 0): boolean {
    const moduloPadre = this.menu.find(p => p.mpm_permiso === modulo);

    if (!moduloPadre || moduloPadre.asignado !== 1) {
      return false;
    }

    if (jerarquia === 0) {
      return true;
    }

    return moduloPadre.children?.some(
      (hijo: any) => hijo.mpm_permiso === submodulo && hijo.asignado === 1
    ) ?? false;
  }
}