import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GridcrudComponent } from '@component/globales/gridcrud/gridcrud.component';
import { KpicardComponent } from '@component/globales/kpicard/kpicard.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { RegistroService } from '../../registro/service/registro.service';
import { Subscription, timer } from 'rxjs';
import { FILTRO_MEDIDA_COMPONENT } from '@mod/catalog/const/catalog.const';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { MOD_MERMA_PAGE_HISTORICO_YEAR } from '@mod/merma/const/loss.conts';

@Component({
  selector: 'app-anhos',
  standalone: true,
  imports: [
    TranslateModule,
    GridcrudComponent,
    LoadingComponent,
    KpicardComponent
  ],
  templateUrl: './anhos.component.html',
  styleUrl: './anhos.component.scss',
})
export class AnhosMermaComponent implements OnInit, OnDestroy {

  // construcator
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: AuthService,
    private permisosService: PermisosService,
    private registroService: RegistroService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos envio al filtro
  search = true
  buttonSearch = this.translate.instant('mod-merma.BUTTON_SEARCH')
  iconFilter = "fa fa-filter"
  componenteFilter = FILTRO_MEDIDA_COMPONENT
  // fin datos envio al filtro

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = 'registro-mermas/obtener-historico-registro-mermas'
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
    {
      title: this.translate.instant('mod-catalog.EXTENT.COLUMN_ID'),
      data: 'id',
      visible: false,
      className: 'text-center align-middle'
    },
    {
      title: this.translate.instant('mod-catalog.EXTENT.COLUMN_EXTENT_NAME'),
      data: 'anho',
      className: 'text-center align-middle'
    },
  ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  // inicio datos envio card information
  wordItem = ''
  mostrarTotal = false
  img_user_actived = "assets/images/img_admin.png"
  titlePage = this.translate.instant('mod-merma.TABLE_TITLE')
  titleTotalSuppliers = this.translate.instant('mod-merma.HISTORY.CARD_TOTAL_HISTORY_TITLE')
  count_total_extent = '0'
  // fin datos envio card information

  cargarIdioma = true;
  mostrarCards = true;
  isAnimationDone = false;

  toggleCards() {
    this.mostrarCards = !this.mostrarCards;
    if (!this.mostrarCards) {
      this.isAnimationDone = true;
    } else {
      this.actualizarContadores()
      this.isAnimationDone = false;
    }
  }

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'merma', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(44, 'historico_merma', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'historico_merma')
    this.permisos = permisos.data
    // sessionStorage.removeItem('nit')
    // sessionStorage.removeItem('razon_social')
    // sessionStorage.removeItem('correo')

    await this.actualizarContadores()

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(200).subscribe(() => {
        this.actualizarContadores()
        this.listar();
        this.cambiarTextos();
        this.cargarIdioma = true;
      });
    });
  }

  ngOnDestroy() {
    if (this.langSub) {
      this.langSub.unsubscribe();
    }
  }

  // metodos Componente
  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-catalog.EXTENT.COLUMN_ID'),
        data: 'id',
        visible: false,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-catalog.EXTENT.COLUMN_EXTENT_NAME'),
        data: 'anho',
        className: 'text-center align-middle'
      },
    ];
  }

  cambiarTextos() {
    this.wordItem = this.translate.instant('mod-catalog.PRODUCT.ASSIGMENT_PRODUCT_TITLE_BREADCRUMB')
    this.titlePage = this.translate.instant('mod-catalog.TABLE_TITLE')
    this.titleTotalSuppliers = this.translate.instant('mod-catalog.EXTENT.CARD_TOTAL_EXTENT_TITLE')
  }

  async verData(_id: string) {
    this.router.navigate([MOD_MERMA_PAGE_HISTORICO_YEAR], { queryParams: { anho: _id } });
  }

  @ViewChild(GridcrudComponent)
  someInput!: GridcrudComponent

  async filtroData() {
    let filtros = await $('.complementoRuta').val();
    this.router.navigate([], { queryParams: { search: (filtros) ? filtros : null }, });
    if (typeof filtros === 'string') {
      this.filters = filtros
    }
  }

  async refrescarTabla() {
    setTimeout(async () => {
      await this.someInput.reload()
    }, 100);
  }

  async actualizarContadores() {
    let year = (this.route.snapshot.queryParams?.['year'] != undefined) ? this.route.snapshot.queryParams?.['year'] : null
    let month = (this.route.snapshot.queryParams?.['month'] != undefined) ? this.route.snapshot.queryParams?.['month'] : null
    const data = await this.registroService.obtenerTotale(year, month)
    this.count_total_extent = data.data.count_total_extent
  }
}
