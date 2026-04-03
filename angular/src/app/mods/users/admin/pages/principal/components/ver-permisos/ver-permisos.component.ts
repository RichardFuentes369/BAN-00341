import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';
import { TranslateService } from '@ngx-translate/core';
import { PermisosService } from '@service/globales/permisos/permisos.service';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-ver-permisos',
  standalone: true,
  imports: [
    TablecrudComponent
  ],
  templateUrl: './ver-permisos.component.html',
  styleUrl: './ver-permisos.component.scss',
})
export class VerPermisosComponent implements OnInit{

  // construcator
  constructor(
    private permisosService :PermisosService,
    private translate: TranslateService,
    private route: ActivatedRoute
  ) { }

  private langSub: Subscription | undefined;
  cargarIdioma = true;

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      const modulo = params['modulo'] || 'null';
      const submodulo = params['submodulo'] || 'null';
      const permiso = params['permiso'] || 'null';
      this.endPoint = `asignacion/reporte-permisos-asignados?modulo=${modulo}&submodulo=${submodulo}&permiso=${permiso}`;
    });

    this.langSub = this.translate.onLangChange.subscribe(() => {
      this.cargarIdioma = false;
      timer(50).subscribe(() => {
        this.listar(); 
        this.cambiarTextos(); 
        this.cargarIdioma = true;
      });
    });
  }

  cambiarTextos(){
    this.titlePage = this.translate.instant('mod-users.TABLE_TITLE')
  }

  listar(){
    this.columnas = [
      {
        title: this.translate.instant('mod-users.COLUMN_MODULE'),
        data: 'MODULO',
        visible: true,
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_SUBMODULE'),
        data: 'SUBMODULO',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_PERMISSION'),
        data: 'PERMISO',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_IDENTIFIER'),
        data: 'IDENTIFICADOR',
        className: 'text-center'
      },    
      {
        title: this.translate.instant('mod-users.COLUMN_EMAIL'),
        data: 'CORREO_USUARIO',
        className: 'text-center'
      },
      {
        title: this.translate.instant('mod-users.COLUMN_STATUS'),
        data: 'ESTADO_USUARIO',
        className: 'text-center',
        width: '50px',
        render: (data: any, type: any) => {
          if (type === 'display') {
            const statusText = data 
              ? this.translate.instant('mod-users.WORD_ACTIVED') 
              : this.translate.instant('mod-users.WORD_INACTIVED');
            
            const dotClass = data ? 'dot-green' : 'dot-red';

            return `
              <span class="custom-tooltip tooltip-bottom" data-title="${statusText}">
                <span class="status-dot ${dotClass}"></span>
              </span>
            `;
          }
          return data;
        }
      }
    ]
  }

  permisos: any[] = []
  titlePage = this.translate.instant('mod-users.TABLE_TITLE')

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = ''
  filters = ''
  habilitarSeleccion = false
  columnas: any[] = [
    {
      title: this.translate.instant('mod-users.COLUMN_MODULE'),
      data: 'MODULO',
      visible: true,
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_SUBMODULE'),
      data: 'SUBMODULO',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_PERMISSION'),
      data: 'PERMISO',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_IDENTIFIER'),
      data: 'IDENTIFICADOR',
      className: 'text-center'
    },    
    {
      title: this.translate.instant('mod-users.COLUMN_EMAIL'),
      data: 'CORREO_USUARIO',
      className: 'text-center'
    },
    {
      title: this.translate.instant('mod-users.COLUMN_STATUS'),
      data: 'ESTADO_USUARIO',
      className: 'text-center',
      width: '50px',
      render: (data: any, type: any) => {
        if (type === 'display') {
          const statusText = data 
            ? this.translate.instant('mod-users.WORD_ACTIVED') 
            : this.translate.instant('mod-users.WORD_INACTIVED');
          
          const dotClass = data ? 'dot-green' : 'dot-red';

          return `
            <span class="custom-tooltip tooltip-bottom" data-title="${statusText}">
              <span class="status-dot ${dotClass}"></span>
            </span>
          `;
        }
        return data;
      }
    }
  ]; 
  permisosAcciones = []
  // fin datos que envio al componente tabla

}
