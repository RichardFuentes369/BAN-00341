import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  TITLE_PATH_STOCK_INDEX 
} from '@mod/stock/const/stock.const';

// componentes
import { IndexComponent } from '@mod/stock/admin/pages/index/index.component';

export const CatalogRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_STOCK_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  // {
  //   path: PATH_ADMIN_USERS,
  //   title: TITLE_PATH_ADMIN_USERS,
  //   data: { breadcrumb: BREADCRUMB_PATH_ADMIN_USERS },
  //   canActivate: [
  //     adminGuard
  //   ],
  //   loadChildren: () => import('./administradores.routing').then(x=>x.UsuariosAdministradoresRoutes)
  // },
  // {
  //   path: PATH_FINAL_USERS,
  //   title: TITLE_PATH_FINAL_USERS,
  //   data: { breadcrumb: BREADCRUMB_PATH_FINAL_USERS },
  //   canActivate: [
  //     adminGuard
  //   ],
  //   loadChildren: () => import('./finales.routing').then(x=>x.UsuariosFinalesRoutes)
  // },
];
