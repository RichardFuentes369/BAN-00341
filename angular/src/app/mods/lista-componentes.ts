import { CrearUsuariosComponent } from '@mod/users/admin/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "@mod/users/admin/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "@mod/users/admin/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from '@mod/users/admin/components/filtro/filtro.component';

import { CrearModuloPermisoComponent } from '@mod/modules/admin/components/crear-modulo-permiso/crear-modulo-permiso.component';
import { EditarModuloPermisoComponent } from '@mod/modules/admin/components/editar-modulo-permiso/editar-modulo-permiso.component';
import { FiltroProveedorComponent } from './catalog/admin/pages/proveedores/components/filtro/filtro.component';
import { CrearProveedorComponent } from './catalog/admin/pages/proveedores/components/crear-proveedor/crear-proveedor.component';
import { VerProveedorComponent } from './catalog/admin/pages/proveedores/components/ver-proveedor/ver-proveedor.component';
import { EditarProveedorComponent } from './catalog/admin/pages/proveedores/components/editar-proveedor/editar-proveedor.component';
import { FiltroProductComponent } from './catalog/admin/pages/productos/components/filtro/filtro.component';
import { CrearProductoComponent } from './catalog/admin/pages/productos/components/crear-producto/crear-producto.component';
import { VerProductoComponent } from './catalog/admin/pages/productos/components/ver-producto/ver-producto.component';
import { EditarProductoComponent } from './catalog/admin/pages/productos/components/editar-producto/editar-producto.component';
import { FiltroTipoMermaComponent } from './merma/admin/pages/tipo/components/filtro/filtro.component';
import { VerTipoMermaComponent } from './merma/admin/pages/tipo/components/ver-tipo/ver-tipo.component';
import { EditarTipoMermaComponent } from './merma/admin/pages/tipo/components/editar-tipo/editar-tipo.component';
import { CrearTipoMermaComponent } from './merma/admin/pages/tipo/components/crear-tipo/crear-tipo.component';
import { ReporteUsuarioComponent } from './users/admin/components/reporte/reporte.component';
import { CargarProductoComponent } from './catalog/admin/pages/productos/components/cargar-producto/cargar-producto.component';
import { VerPermisosComponent } from './users/admin/pages/principal/components/ver-permisos/ver-permisos.component';
import { CrearLoteComponent } from './lote/admin/pages/lote/components/crear-lote/crear-lote.component';
import { EditarLoteComponent } from './lote/admin/pages/lote/components/editar-lote/editar-lote.component';
import { FiltroLoteComponent } from './lote/admin/pages/lote/components/filtro/filtro.component';
import { ReporteLoteComponent } from './lote/admin/pages/lote/components/reporte/reporte.component';
import { VerLoteComponent } from './lote/admin/pages/lote/components/ver-lote/ver-lote.component';
import { FiltroMarcaComponent } from './catalog/admin/pages/marcas/components/filtro/filtro.component';
import { CrearMarcaComponent } from './catalog/admin/pages/marcas/components/crear-marca/crear-marca.component';
import { VerMarcaComponent } from './catalog/admin/pages/marcas/components/ver-marca/ver-marca.component';
import { EditarMarcaComponent } from './catalog/admin/pages/marcas/components/editar-marca/editar-marca.component';

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
    {
      name: 'ReporteUsuarioComponent',
      componente: ReporteUsuarioComponent      
    },
    {
      name: 'VerPermisosComponent',
      componente: VerPermisosComponent     
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
    // productos
    {
      name: 'FiltroProductComponent',
      componente: FiltroProductComponent
    },  
    {
      name: 'CargarProductoComponent',
      componente: CargarProductoComponent
    },
    {
      name: 'CrearProductoComponent',
      componente: CrearProductoComponent  
    }, 
    {
      name: 'VerProductoComponent',
      componente: VerProductoComponent  
    },
    {
      name: 'EditarProductoComponent',
      componente: EditarProductoComponent  
    }, 
    // modulo catalogo
    // marca
    {
      name: 'FiltroMarcaComponent',
      componente: FiltroMarcaComponent
    },  
    {
      name: 'CrearMarcaComponent',
      componente: CrearMarcaComponent 
    }, 
    {
      name: 'VerMarcaComponent',
      componente: VerMarcaComponent 
    },
    {
      name: 'EditarMarcaComponent',
      componente: EditarMarcaComponent  
    },

    // modulo merma
    // tipo
    {
      name: 'FiltroTipoMermaComponent',
      componente: FiltroTipoMermaComponent
    },  
    {
      name: 'VerTipoMermaComponent',
      componente: VerTipoMermaComponent
    },  
    {
      name: 'EditarTipoMermaComponent',
      componente: EditarTipoMermaComponent
    },  
    {
      name: 'CrearTipoMermaComponent',
      componente: CrearTipoMermaComponent
    },  
    // modulo lote
    {
      name: 'CrearLoteComponent',
      componente: CrearLoteComponent
    },  
    {
      name: 'EditarLoteComponent',
      componente: EditarLoteComponent
    },  
    {
      name: 'FiltroLoteComponent',
      componente: FiltroLoteComponent
    },  
    {
      name: 'ReporteLoteComponent',
      componente: ReporteLoteComponent
    },  
    {
      name: 'VerLoteComponent',
      componente: VerLoteComponent
    },  
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
