import { Routes } from '@angular/router';

import { 
    TITLE_PATH_ADMIN_SUPPLIER 
} from '@mod/catalog/const/catalog.const';

// componentes
import { ProveedoresComponent } from '@mod/catalog/admin/pages/proveedores/proveedores.component';

export const CatalogoProveedoresRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_SUPPLIER,
    data: { breadcrumb: null },
    component: ProveedoresComponent,
  },
];
