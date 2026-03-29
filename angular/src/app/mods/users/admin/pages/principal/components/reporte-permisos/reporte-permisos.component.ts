import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ModulosService } from '@mod/modules/admin/service/modulos.service';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-reporte-permisos',
  standalone: true,
  imports: [
    TranslateModule,
    CommonModule
  ],
  templateUrl: './reporte-permisos.component.html',
  styleUrl: './reporte-permisos.component.scss',
})
export class ReportePermisosComponent implements OnInit{

  private readonly _moduloService = inject(ModulosService);

  selectModulos = []
  selectSubModulos = []
  selectPermisos = []

  ngOnInit() {
    this.listar();
  } 

  async listar() {
    try {
      // cambia el 0 por el id seleccionado
      const response = await this._moduloService.obtenerPermisosPorModule(0)
      this.selectModulos = response.data[0].result
      console.log(this.selectModulos)
    } catch (error) {
      console.error(error)
    }
  }

  /*
  SELECT 
	mua.id, 
	mua.firstName, 
	mua.lastName, 
	mua.email, 
	mua.isActive
FROM mod_permisos_modulo_asignacion mpma
INNER JOIN mod_usuarios_admin mua ON mua.id = mpma.user_id

-- permisos
-- WHERE permiso = "eliminar_individual"
-- AND modulo_padre_id = 2 -- anterior select

-- submodulos
-- WHERE permiso = "finales"
-- AND modulo_padre_id = 1 -- anterior select

-- modulos
-- WHERE permiso = "usuarios"
-- AND modulo_padre_id is null
*/

}
