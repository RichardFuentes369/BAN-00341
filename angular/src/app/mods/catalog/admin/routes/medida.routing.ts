import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ASSIGN_PRODUCT_USERS,
  PATH_ASSIGN_PRODUCT_USERS,
    TITLE_PATH_ADMIN_BRAND,
    TITLE_PATH_ADMIN_EXTENT,
    TITLE_PATH_ASSIGN_PRODUCT_USERS,
} from '@mod/catalog/const/catalog.const';

// componentes
import { MedidaComponent } from '../pages/medida/medida.component';
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { ProductosComponent } from '../pages/productos/productos.component';

export const CatalogoMedidaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_EXTENT,
    data: { breadcrumb: null },
    component: MedidaComponent,
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
