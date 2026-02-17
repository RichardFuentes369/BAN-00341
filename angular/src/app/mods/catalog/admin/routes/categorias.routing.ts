import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT,
  TITLE_PATH_ADMIN_CATEGORY,
  TITLE_PATH_ADMIN_PRODUCT, 
} from '@mod/catalog/const/catalog.const';

// componentes
import { CategoriasComponent } from '@mod/catalog/admin/pages/categorias/categorias.component';
import { adminGuard } from '@guard/roles/admin/admin.guard';
// import { ProductosComponent } from '../pages/categorias/components/productos/productos.component';

export const CatalogoCategoriasRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_CATEGORY,
    data: { breadcrumb: null },
    component: CategoriasComponent,
  },
  {
    path: PATH_ADMIN_PRODUCT,
    title: TITLE_PATH_ADMIN_PRODUCT,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_PRODUCT },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./productos.routing').then(x=>x.CatalogoProductosRoutes)
  },
];
