import { CrearUsuariosComponent } from '@mod/users/admin/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "@mod/users/admin/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "@mod/users/admin/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from '@mod/users/admin/components/filtro/filtro.component';

import { CrearModuloPermisoComponent } from '@mod/modules/admin/components/crear-modulo-permiso/crear-modulo-permiso.component';
import { EditarModuloPermisoComponent } from '@mod/modules/admin/components/editar-modulo-permiso/editar-modulo-permiso.component';
import { VerModuloPermisoComponent } from '@mod/modules/admin/components/ver-modulo-permiso/ver-modulo-permiso.component';
import { FiltroProveedorComponent } from './catalog/admin/pages/proveedores/components/filtro/filtro.component';
import { CrearProveedorComponent } from './catalog/admin/pages/proveedores/components/crear-proveedor/crear-proveedor.component';
import { VerProveedorComponent } from './catalog/admin/pages/proveedores/components/ver-proveedor/ver-proveedor.component';
import { EditarProveedorComponent } from './catalog/admin/pages/proveedores/components/editar-proveedor/editar-proveedor.component';
import { FiltroCategoriaComponent } from './catalog/admin/pages/categorias/components/filtro/filtro.component';
import { VerCategoriaComponent } from './catalog/admin/pages/categorias/components/ver-categoria/ver-categoria.component';
import { CrearCategoriaComponent } from './catalog/admin/pages/categorias/components/crear-categoria/crear-categoria.component';
import { EditarCategoriaComponent } from './catalog/admin/pages/categorias/components/editar-categoria/editar-categoria.component';

export class ListaComponentes {

  /*
  * Componentes forzados a cargar en los modals
  */
  componentes: any[] = [
    // usuarios
    {
      name: 'CrearUsuariosComponent',
      componente: CrearUsuariosComponent
    },
    {
      name: 'VerUsuariosComponent',
      componente: VerUsuariosComponent
    },
    {
      name: 'EditarUsuariosComponent',
      componente: EditarUsuariosComponent
    },
    {
      name: 'FiltroUsuariosComponent',
      componente: FiltroUsuariosComponent      
    },
    
    // modulos permisos
    {
      name: 'CrearModuloPermisoComponent',
      componente: CrearModuloPermisoComponent  
    },
    {
      name: 'EditarModuloPermisoComponent',
      componente: EditarModuloPermisoComponent  
    },
    {
      name: 'VerModuloPermisoComponent',
      componente: VerModuloPermisoComponent  
    },
    
    // modulo catalogo
    // proveedores
    {
      name: 'CrearProveedorComponent',
      componente: CrearProveedorComponent
    },    
    {
      name: 'VerProveedorComponent',
      componente: VerProveedorComponent
    },    
    {
      name: 'EditarProveedorComponent',
      componente: EditarProveedorComponent
    },
    {
      name: 'FiltroProveedorComponent',
      componente: FiltroProveedorComponent      
    },
    // modulo catalogo
    // categorias
    {
      name: 'FiltroCategoriaComponent',
      componente: FiltroCategoriaComponent
    },  
    {
      name: 'CrearCategoriaComponent',
      componente: CrearCategoriaComponent  
    }, 
    {
      name: 'VerCategoriaComponent',
      componente: VerCategoriaComponent  
    },
    {
      name: 'EditarCategoriaComponent',
      componente: EditarCategoriaComponent  
    },
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
