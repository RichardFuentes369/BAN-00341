import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ADMIN_BRAND,
  BREADCRUMB_PATH_ADMIN_EXTENT,
  BREADCRUMB_PATH_ADMIN_PRODUCT,
  BREADCRUMB_PATH_ADMIN_SUPPLIER,
  PATH_ADMIN_BRAND,
  PATH_ADMIN_EXTENT,
  PATH_ADMIN_PRODUCT,
  PATH_ADMIN_SUPPLIER,
  TITLE_PATH_ADMIN_BRAND,
  TITLE_PATH_ADMIN_EXTENT,
  TITLE_PATH_ADMIN_PRODUCT,
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
    path: PATH_ADMIN_PRODUCT,
    title: TITLE_PATH_ADMIN_PRODUCT,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_PRODUCT },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./productos.routing').then(x=>x.CatalogoProductosRoutes)
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
  {
    path: PATH_ADMIN_EXTENT,
    title: TITLE_PATH_ADMIN_EXTENT,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_EXTENT },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./medida.routing').then(x=>x.CatalogoMedidaRoutes)
  },
];
