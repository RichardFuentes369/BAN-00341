import { CommonModule} from '@angular/common';
import * as XLSX from 'xlsx';
import { Component, EventEmitter, inject, OnInit, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { PermisosService } from '../../../../../../../services/globales/permisos/permisos.service';

@Component({
  selector: 'app-reporte-permisos',
  standalone: true,
  imports: [
    TranslateModule, 
    FormsModule,
  ],
  templateUrl: './reporte-permisos.component.html',
  styleUrl: './reporte-permisos.component.scss',
})
export class ReportePermisosComponent implements OnInit{

  constructor(
    private permisosService :PermisosService,
    private translate: TranslateService
  ) { }

  private readonly _moduloService = inject(ModulosService);

  // inicio datos envio al modal
  tamano = ""
  scrollable = false
  title = ""
  subtitle = ""
  save = false
  buttonSave = this.translate.instant('mod-users.BUTTON_SAVE_')
  edit = false
  buttonEdit = this.translate.instant('mod-users.BUTTON_UPDATE_')
  cancel = true
  buttonCancel = this.translate.instant('mod-users.BUTTON_CANCEL')
  cierreModal = "true"
  componentePrecargado = ""
  // fin datos envio al modal


  // Inicio propios del componente
  loading1 = false;
  loading2 = false;
  loading3 = false;
  
  ModuloModulos = 17
  ModuloBodega = 64

  selectModulos: any[] = [];
  selectSubModulos: any[] = [];
  selectPermisos: any[] = [];
  
  model = {
    modulo: 0,
    submodulo: 0,
    permiso: 0
  }
  // Fin propios del componente

  ngOnInit() {
    this.listar();
  } 

  limpiar(){
    this.model.modulo = 0
    this.model.submodulo = 0
    this.model.permiso = 0
    this.selectSubModulos = []
    this.selectPermisos = []
  }

  async listar() {
    this.loading1 = true
    try {
      const response = await this._moduloService.obtenerPermisosPorModule(0)
      if (response?.data?.[0]?.result) {
        this.selectModulos = response.data[0].result
      }
    } catch (error) {
      console.error('Error UTS-Reporte:', error)
    } finally {
      this.loading1 = false
    }
  }

  async cambioModulo(idModulo: number) {
    this.selectSubModulos = [];
    this.selectPermisos = [];
    this.model.submodulo = 0;
    this.model.permiso = 0;

    if (idModulo == 0) return;

    this.loading2 = true;
    try {
      const response = await this._moduloService.obtenerPermisosPorModule(idModulo);
      if (response?.data?.[0]?.result) {
        this.selectSubModulos = response.data[0].result;
      }
    } catch (error) {
      console.error('Error cargando submodulos:', error);
    } finally {
      this.loading2 = false;
    }
  }

  async cambioSubmodulo(idSubmodulo: number) {
    this.selectPermisos = [];
    this.model.permiso = 0;

    if (idSubmodulo == 0) return;

    this.loading3 = true;
    try {
      const response = await this._moduloService.obtenerPermisosPorModule(idSubmodulo);
      if (response?.data?.[0]?.result) {
        this.selectPermisos = response.data[0].result;
      }
    } catch (error) {
      console.error('Error cargando permisos:', error);
    } finally {
      this.loading3 = false;
    }
  }

  async consultar_sp_reporte_permisos_paginado() {
    let page = null;
    let limit = null;
    let permiso = null;
    let modulo = null;
    let submodulo = null;

    if (+this.model.modulo) {
      modulo = this.selectModulos.find(obj => obj.id === +this.model.modulo)?.nombre || null;
    }
    if (+this.model.submodulo) {
      submodulo = this.selectSubModulos.find(obj => obj.id === +this.model.submodulo)?.nombre || null;
    }
    if (+this.model.permiso) {
      permiso = this.selectPermisos.find(obj => obj.id === +this.model.permiso)?.nombre || null;
    }

    try {
      const response = await this.permisosService.consultarPermisosAsignados(modulo, submodulo, permiso, page, limit);

      // 1. OBTENER EL ARRAY (Sin hacer stringify)
      const datosParaExcel = response.data[1];

      if (!datosParaExcel || datosParaExcel.length === 0) {
        console.warn("No hay datos para exportar");
        return;
      }

      // 2. LIMPIAR DATOS (Ahora sí sobre el array original)
      const datosLimpios = datosParaExcel.map((item: any) => ({
        'Módulo': item.MODULO,
        'Submódulo': item.SUBMODULO === '---' ? 'N/A' : item.SUBMODULO,
        'Permiso': item.PERMISO.replace(/[\r\n]+/g, ' ').trim(), 
        'Identificador': item.IDENTIFICADOR,
        'Usuario': item.CORREO_USUARIO,
        'Estado': item.ESTADO_USUARIO
      }));
      
      // 3. CREAR EXCEL
      const worksheet = XLSX.utils.json_to_sheet(datosLimpios);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Reporte de Permisos');

      // 4. AJUSTAR ANCHO DE COLUMNAS
      const objectMaxLength: any[] = [];
      datosLimpios.forEach((row: any) => {
        Object.values(row).forEach((val, i) => {
          const columnLength = val ? val.toString().length : 10;
          objectMaxLength[i] = Math.max(objectMaxLength[i] || 0, columnLength);
        });
      });
      worksheet['!cols'] = objectMaxLength.map(width => ({ width: width + 2 }));

      // 5. DESCARGAR
      XLSX.writeFile(workbook, `Reporte_Permisos_${new Date().getTime()}.xlsx`);

    } catch (error) {
      console.error("Error al descargar Excel", error);
    }
  }

  @Output() verItem = new EventEmitter<any>();
  seeItem() { this.verItem.emit(this.model); }

}
