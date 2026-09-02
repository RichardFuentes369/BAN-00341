import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { TITLE_PATH_FINAL_USERS } from '@mod/users/const/users.const';

// componentes
import { TITLE_PATH_SALERETURN_RETURNS } from '@mod/sale_and_return/const/sale_and_return.const';
import { ReturnComponent } from '../pages/return/return.component';

export const ReturnsRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SALERETURN_RETURNS,
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: ReturnComponent,
  },
];
