import { CommonModule} from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { TranslateModule } from '@ngx-translate/core';
import { PermisosService } from '../../../../../../../services/globales/permisos/permisos.service';
import { TablecrudComponent } from '@component/globales/tablecrud/tablecrud.component';

@Component({
  selector: 'app-reporte-permisos',
  standalone: true,
  imports: [TranslateModule, FormsModule, TablecrudComponent],
  templateUrl: './reporte-permisos.component.html',
  styleUrl: './reporte-permisos.component.scss',
})
export class ReportePermisosComponent implements OnInit{

  constructor(
    private permisosService :PermisosService,
  ) { }

  private readonly _moduloService = inject(ModulosService);

  loading1 = false;
  loading2 = false;
  loading3 = false;

  ModuloModulos = 17
  ModuloLote = 64

  selectModulos: any[] = [];
  selectSubModulos: any[] = [];
  selectPermisos: any[] = [];

  // inicio datos que envio al componente tabla
  showcampoFiltro = false
  endPoint = `asignacion/reporte-permisos-asignados?modulo=${null}&submodulo=${null}&permiso=${null}&page=${1}&perPage=${10}&lang=${'es'}`
  filters = ''
  columnas: any[] = [
  ]; 
  // fin datos que envio al componente tabla

















  model = {
    modulo: 0,
    submodulo: 0,
    permiso: 0
  }

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

  async consultar(){
    let modulo = null
    let submodulo = null
    let permiso = null
    let page = 1
    let perPage = 5

    if(+this.model.modulo){
      modulo = this.selectModulos.find(obj => obj.id === +this.model.modulo).nombre
    }
    if(+this.model.submodulo){
      submodulo = this.selectSubModulos.find(obj => obj.id === +this.model.submodulo).nombre
    }
    if(+this.model.permiso){
      permiso = this.selectPermisos.find(obj => obj.id === +this.model.permiso).nombre
    }

    const permisosAsignados = await this.permisosService.consultarPermisosAsignados(modulo, submodulo, permiso, page, perPage)
    console.log(permisosAsignados.data[0][0])
    console.log(permisosAsignados.data[1])
  }

}
