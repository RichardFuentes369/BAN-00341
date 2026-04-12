import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ADMIN_BRAND,
  BREADCRUMB_PATH_ADMIN_CATEGORY,
  BREADCRUMB_PATH_ADMIN_LOTE,
  BREADCRUMB_PATH_ADMIN_SUPPLIER,
  PATH_ADMIN_BRAND,
  PATH_ADMIN_CATEGORY,
  PATH_ADMIN_LOTE,
  PATH_ADMIN_SUPPLIER,
  TITLE_PATH_ADMIN_BRAND,
  TITLE_PATH_ADMIN_CATEGORY,
  TITLE_PATH_ADMIN_LOTE,
  TITLE_PATH_ADMIN_SUPPLIER,
  TITLE_PATH_CATALOG_INDEX 
} from '@mod/catalog/const/catalog.const';

// componentes
import { IndexComponent } from '@mod/catalog/admin/pages/index/index.component';

export const CatalogRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_CATALOG_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_ADMIN_CATEGORY,
    title: TITLE_PATH_ADMIN_CATEGORY,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_CATEGORY },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./categorias.routing').then(x=>x.CatalogoCategoriasRoutes)
  },
  {
    path: PATH_ADMIN_SUPPLIER,
    title: TITLE_PATH_ADMIN_SUPPLIER,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_SUPPLIER },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./proveedores.routing').then(x=>x.CatalogoProveedoresRoutes)
  },
  {
    path: PATH_ADMIN_BRAND,
    title: TITLE_PATH_ADMIN_BRAND,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_BRAND },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./marcas.routing').then(x=>x.CatalogoMarcasRoutes)
  },
];
