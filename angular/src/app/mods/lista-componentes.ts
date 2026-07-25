import { CrearUsuariosComponent } from '@mod/users/admin/components/crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from "@mod/users/admin/components/editar-usuarios/editar-usuarios.component";
import { VerUsuariosComponent } from "@mod/users/admin/components/ver-usuarios/ver-usuarios.component";
import { FiltroUsuariosComponent } from '@mod/users/admin/components/filtro/filtro.component';

import { CrearModuloPermisoComponent } from '@mod/modules/admin/components/crear-modulo-permiso/crear-modulo-permiso.component';
import { EditarModuloPermisoComponent } from '@mod/modules/admin/components/editar-modulo-permiso/editar-modulo-permiso.component';
import { FiltroProveedorComponent } from '@mod/catalog/admin/pages/proveedores/components/filtro/filtro.component';
import { CrearProveedorComponent } from '@mod/catalog/admin/pages/proveedores/components/crear-proveedor/crear-proveedor.component';
import { VerProveedorComponent } from '@mod/catalog/admin/pages/proveedores/components/ver-proveedor/ver-proveedor.component';
import { EditarProveedorComponent } from '@mod/catalog/admin/pages/proveedores/components/editar-proveedor/editar-proveedor.component';
import { FiltroProductComponent } from '@mod/catalog/admin/pages/productos/components/filtro/filtro.component';
import { CrearProductoComponent } from '@mod/catalog/admin/pages/productos/components/crear-producto/crear-producto.component';
import { VerProductoComponent } from '@mod/catalog/admin/pages/productos/components/ver-producto/ver-producto.component';
import { EditarProductoComponent } from '@mod/catalog/admin/pages/productos/components/editar-producto/editar-producto.component';
import { FiltroTipoMermaComponent } from '@mod/merma/admin/pages/tipo/components/filtro/filtro.component';
import { VerTipoMermaComponent } from '@mod/merma/admin/pages/tipo/components/ver-tipo/ver-tipo.component';
import { EditarTipoMermaComponent } from '@mod/merma/admin/pages/tipo/components/editar-tipo/editar-tipo.component';
import { CrearTipoMermaComponent } from '@mod/merma/admin/pages/tipo/components/crear-tipo/crear-tipo.component';
import { ReporteUsuarioComponent } from '@mod/users/admin/components/reporte/reporte.component';
import { CargarProductoComponent } from '@mod/catalog/admin/pages/productos/components/cargar-producto/cargar-producto.component';
import { VerPermisosComponent } from '@mod/users/admin/pages/principal/components/ver-permisos/ver-permisos.component';
import { CrearWarehouseComponent } from '@mod/warehouse/admin/pages/warehouse/components/crear-warehouse/crear-warehouse.component';
import { EditarWarehouseComponent } from '@mod/warehouse/admin/pages/warehouse/components/editar-warehouse/editar-warehouse.component';
import { FiltroWarehouseComponent } from '@mod/warehouse/admin/pages/warehouse/components/filtro/filtro.component';
import { ReporteWarehouseComponent } from '@mod/warehouse/admin/pages/warehouse/components/reporte/reporte.component';
import { VerWarehouseComponent } from '@mod/warehouse/admin/pages/warehouse/components/ver-warehouse/ver-warehouse.component';
import { FiltroMarcaComponent } from '@mod/catalog/admin/pages/marcas/components/filtro/filtro.component';
import { CrearMarcaComponent } from '@mod/catalog/admin/pages/marcas/components/crear-marca/crear-marca.component';
import { VerMarcaComponent } from '@mod/catalog/admin/pages/marcas/components/ver-marca/ver-marca.component';
import { EditarMarcaComponent } from '@mod/catalog/admin/pages/marcas/components/editar-marca/editar-marca.component';
import { FiltroMedidaComponent } from '@mod/catalog/admin/pages/medida/component/filtro/filtro.component';
import { CrearMedidaComponent } from '@mod/catalog/admin/pages/medida/component/crear-medida/crear-medida.component';
import { VerMedidaComponent } from '@mod/catalog/admin/pages/medida/component/ver-medida/ver-medida.component';
import { EditarMedidaComponent } from '@mod/catalog/admin/pages/medida/component/editar-medida/editar-medida.component';
import { FiltroRegistroComponent } from '@mod/merma/admin/pages/registro/components/filtro/filtro.component';
import { VerRegistroComponent } from '@mod/merma/admin/pages/registro/components/ver-registro/ver-registro.component';
import { EditarRegistroComponent } from '@mod/merma/admin/pages/registro/components/editar-registro/editar-registro.component';
import { CrearRegistroComponent } from '@mod/merma/admin/pages/registro/components/crear-registro/crear-registro.component';
import { CrearVarComponent } from '@mod/vars/admin/components/crear-var/crear-var.component';
import { EditarVarComponent } from '@mod/vars/admin/components/editar-var/editar-var.component';
import { FiltroVarComponent } from '@mod/vars/admin/components/filtro-var/filtro-var.component';
import { ReporteComponent } from '@mod/vars/admin/components/reporte/reporte.component';
import { VerVarComponent } from '@mod/vars/admin/components/ver-var/ver-var.component';
import { FiltroAlertsVComponent } from './alerts/admin/pages/vencimiento/components/filtro/filtro.component';
import { FiltroAlertsSStockComponent } from './alerts/admin/pages/stock/components/filtro/filtro.component';

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
    // modulo catalogo
    // unidad medida
    {
      name: 'FiltroMedidaComponent',
      componente: FiltroMedidaComponent
    },  
    {
      name: 'CrearMedidaComponent',
      componente: CrearMedidaComponent
    }, 
    {
      name: 'VerMedidaComponent',
      componente: VerMedidaComponent 
    },
    {
      name: 'EditarMedidaComponent',
      componente: EditarMedidaComponent
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

    //perdidas
    {
      name: 'FiltroRegistroComponent',
      componente: FiltroRegistroComponent
    },  
    {
      name: 'VerRegistroComponent',
      componente: VerRegistroComponent
    },  
    {
      name: 'EditarRegistroComponent',
      componente: EditarRegistroComponent
    },  
    {
      name: 'CrearRegistroComponent',
      componente: CrearRegistroComponent
    },  

    // modulo bodega
    {
      name: 'CrearWarehouseComponent',
      componente: CrearWarehouseComponent
    },  
    {
      name: 'EditarWarehouseComponent',
      componente: EditarWarehouseComponent
    },  
    {
      name: 'FiltroWarehouseComponent',
      componente: FiltroWarehouseComponent
    },  
    {
      name: 'ReporteWarehouseComponent',
      componente: ReporteWarehouseComponent
    },  
    {
      name: 'VerWarehouseComponent',
      componente: VerWarehouseComponent
    },  

    // modulo var
    {
      name: 'CrearVarComponent',
      componente: CrearVarComponent
    },  
    {
      name: 'EditarVarComponent',
      componente: EditarVarComponent
    },  
    {
      name: 'FiltroVarComponent',
      componente: FiltroVarComponent
    },  
    {
      name: 'ReporteComponent',
      componente: ReporteComponent
    },  
    {
      name: 'VerVarComponent',
      componente: VerVarComponent
    },  
    {
      name: 'FiltroAlertsVComponent',
      componente: FiltroAlertsVComponent
    },  
    {
      name: 'FiltroAlertsSStockComponent',
      componente: FiltroAlertsSStockComponent
    },  
  ];

  obtenerComponentePorNombre(nombre: string) {
    return this.componentes.find(comp => comp.name === nombre);
  }
}
