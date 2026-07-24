import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '@guard/service/auth.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { AlertasService } from '../../service/alertas.service';
import { Subscription, timer } from 'rxjs';
import { _PAGE_WITHOUT_PERMISSION_ADMIN, STORAGE_KEY_ADMIN_AUTH } from '@const/app.const';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { SearchComponent } from '@component/globales/search/search.component';
import { ReportComponent } from '@component/globales/report/report.component';
import { LoadingComponent } from '@component/globales/loading/loading.component';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

@Component({
  selector: 'app-vencimiento',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    // SearchComponent,
    // ReportComponent,
    LoadingComponent,
    TablecrudComponent
  ],
  templateUrl: './vencimiento.component.html',
  styleUrl: './vencimiento.component.scss',
})
export class VencimientoComponent implements OnInit {

  // construcator
  constructor(
    private router: Router,
    private userService: AuthService,
    private route: ActivatedRoute,
    private permisosService: PermisosService,
    private alertasService: AlertasService,
    private translate: TranslateService
  ) { }

  private langSub: Subscription | undefined;
  permisos: any[] = []

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `alert-expiration/reporte-stock-vencimiento?`
  habilitarSeleccion = true
  filters = ''
  columnas: any[] = [
      {
        title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
        data: 'lote',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_FECHA_ENTRADA'),
        data: 'fecha_entrada',
        visible: true,
        className: 'text-center align-middle',
        render: (data: any) => {
          if (!data) return '';

          const date = new Date(data);

          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }

          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // Importante para evitar que cambie de día por la zona horaria local
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_FECHA_VENCIMIENTO'),
        data: 'fecha_vencimiento',
        visible: true,
        className: 'text-center align-middle',
        render: (data: any) => {
          if (!data) return '';

          if (data === "**********") return '**********';

          const date = new Date(data);

          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }

          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // Importante para evitar que cambie de día por la zona horaria local
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.WORD_DAYS_REMAINING'),
        data: 'dias_restantes',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
        data: 'estado_alerta',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_COMPRADA'),
        data: 'cantidad_comprada',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_VENDIDA'),
        data: 'cantidad_vendida',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
        data: 'estado',
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-catalog.PRODUCT.WORD_PRODUCT'),
        data: 'nombre_producto',
        visible: true,
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-catalog.SUPPLIER.WORD_SUPPLIER'),
        data: 'nombre_proveedor',
        visible: true,
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
        data: 'cantidad_en_bodega',
        className: 'text-center align-middle'
      },
    ];
  permisosAcciones = this.permisos
  // fin datos que envio al componente tabla

  titlePage = this.translate.instant('mod-users.TABLE_TITLE')

  cargarIdioma = true;

  // metodos Init, Destroy
  async ngOnInit() {
    await this.userService.refreshToken(STORAGE_KEY_ADMIN_AUTH);
    const userData = await this.userService.getUser(STORAGE_KEY_ADMIN_AUTH);

    const permiso_modulo = await this.permisosService.permisoPage(0, 'alertas', userData.data.id)
    const permiso_submodulo = await this.permisosService.permisoPage(91, 'alerta_caducidad', userData.data.id)

    if (permiso_modulo.data === "" || permiso_submodulo.data === "") {
      this.router.navigate([_PAGE_WITHOUT_PERMISSION_ADMIN]);
    }

    const permisos = await this.permisosService.permisos(userData.data.id, 'alerta_caducidad')
    this.permisos = permisos.data;
    this.permisosAcciones = this.permisos;

    // await this.actualizarContadores()

    this.route.queryParams.subscribe(params => {
      const valorSearch = params['search'];
      if (valorSearch) {
        this.filters = valorSearch;
      } else {
        this.filters = '';
      }
    });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(50).subscribe(() => {
        this.listar();
        //     this.actualizarContadores();
        this.cambiarTextos();
        this.cargarIdioma = true;
      });
    });
  }

  // metodos Componente
  listar() {
    this.columnas = [
      {
        title: this.translate.instant('mod-warehouse.COLUMN_BATCH'),
        data: 'lote',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_FECHA_ENTRADA'),
        data: 'fecha_entrada',
        visible: true,
        className: 'text-center align-middle',
        render: (data: any) => {
          if (!data) return '';

          const date = new Date(data);

          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }

          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // Importante para evitar que cambie de día por la zona horaria local
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_FECHA_VENCIMIENTO'),
        data: 'fecha_vencimiento',
        visible: true,
        className: 'text-center align-middle',
        render: (data: any) => {
          if (!data) return '';

          if (data === "**********") return '**********';

          const date = new Date(data);

          if (isNaN(date.getTime())) {
            return 'Fecha inválida';
          }

          return date.toLocaleDateString('es-CO', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            timeZone: 'UTC' // Importante para evitar que cambie de día por la zona horaria local
          });
        }
      },
      {
        title: this.translate.instant('mod-warehouse.WORD_DAYS_REMAINING'),
        data: 'dias_restantes',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
        data: 'estado_alerta',
        visible: true,
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_COMPRADA'),
        data: 'cantidad_comprada',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_VENDIDA'),
        data: 'cantidad_vendida',
        className: 'text-center align-middle'
      },
      {
        title: this.translate.instant('mod-warehouse.LABEL_ESTADO'),
        data: 'estado',
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-catalog.PRODUCT.WORD_PRODUCT'),
        data: 'nombre_producto',
        visible: true,
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-catalog.SUPPLIER.WORD_SUPPLIER'),
        data: 'nombre_proveedor',
        visible: true,
        className: 'text-center align-middle'
      },

      {
        title: this.translate.instant('mod-warehouse.LABEL_CANTIDAD_BODEGA'),
        data: 'cantidad_en_bodega',
        className: 'text-center align-middle'
      },
    ]
  }

  cambiarTextos() {
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
    // this.titleTotalUsers = this.translate.instant('mod-users.CARD_TOTAL_ADMIN_TITLE')
    // this.titleTotalPermission = this.translate.instant('mod-users.CARD_TOTAL_PERMISSIONS_TITLE')
    // this.titleTotalActivedUsers = this.translate.instant('mod-users.CARD_TOTAL_ACTIVED_USERS')
    // this.titleTotalSuspendedUsers = this.translate.instant('mod-users.CARD_TOTAL_SUSPENDED_USERS')
  }

  tienePermiso(nombre: string): boolean {
    return this.permisosAcciones?.some((permiso) => permiso.permiso_permiso === nombre);
  }
}
