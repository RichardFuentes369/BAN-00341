import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT,
  TITLE_PATH_ADMIN_PRODUCT, 
} from '@mod/catalog/const/catalog.const';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { ProductosComponent } from '../pages/productos/productos.component';

export const CatalogoProductosRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_PRODUCT,
    data: { breadcrumb: null },
    component: ProductosComponent,
  },
];
