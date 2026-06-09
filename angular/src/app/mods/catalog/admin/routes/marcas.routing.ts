import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ASSIGN_PRODUCT_USERS,
  PATH_ASSIGN_PRODUCT_USERS,
    TITLE_PATH_ADMIN_BRAND,
    TITLE_PATH_ASSIGN_PRODUCT_USERS,
} from '@mod/catalog/const/catalog.const';

// componentes
import { MarcasComponent } from '../pages/marcas/marcas.component';
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { ProductosComponent } from '../pages/productos/productos.component';

export const CatalogoMarcasRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_BRAND,
    data: { breadcrumb: null },
    component: MarcasComponent,
  },
  {
    path: PATH_ASSIGN_PRODUCT_USERS,
    data: { breadcrumb: BREADCRUMB_PATH_ASSIGN_PRODUCT_USERS },
    title: TITLE_PATH_ASSIGN_PRODUCT_USERS,
    canActivate: [
      adminGuard
    ],
    component: ProductosComponent,
  },
];
