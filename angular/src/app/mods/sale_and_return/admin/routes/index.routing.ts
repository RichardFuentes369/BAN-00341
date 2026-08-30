import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { TITLE_PATH_SALE_RETURN_INDEX } from '@mod/sale_and_return/const/sale_and_return.const';

// componentes
import { IndexComponent } from '@mod/sale_and_return/admin/pages/index/index.component';

export const SaleReturnRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SALE_RETURN_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
//   {
//     path: PATH_ADMIN_USERS,
//     title: TITLE_PATH_ADMIN_USERS,
//     data: { breadcrumb: BREADCRUMB_PATH_ADMIN_USERS },
//     canActivate: [
//       adminGuard
//     ],
//     loadChildren: () => import('./administradores.routing').then(x=>x.UsuariosAdministradoresRoutes)
//   },
//   {
//     path: PATH_FINAL_USERS,
//     title: TITLE_PATH_FINAL_USERS,
//     data: { breadcrumb: BREADCRUMB_PATH_FINAL_USERS },
//     canActivate: [
//       adminGuard
//     ],
//     loadChildren: () => import('./finales.routing').then(x=>x.UsuariosFinalesRoutes)
//   },
];
