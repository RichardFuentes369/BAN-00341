import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
    BREADCRUMB_PATH_ADMIN_EXPIRATION,
    BREADCRUMB_PATH_ADMIN_STOCK,
    PATH_ADMIN_EXPIRATION,
    PATH_ADMIN_STOCK,
    TITLE_PATH_ADMIN_EXPIRATION, 
    TITLE_PATH_ADMIN_STOCK, 
    TITLE_PATH_ALERTS_INDEX, 
} from '@mod/alerts/const/alerts.const';

// componentes
import { IndexComponent } from '@mod/alerts/admin/pages/index/index.component';

export const AlertasRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ALERTS_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_ADMIN_EXPIRATION,
    title: TITLE_PATH_ADMIN_EXPIRATION,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_EXPIRATION },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./caducidad.routing').then(x=>x.ExpirationRoutes)
  },
  {
    path: PATH_ADMIN_STOCK,
    title: TITLE_PATH_ADMIN_STOCK,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_STOCK },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./stock.routing').then(x=>x.StockRoutes)
  },
];
