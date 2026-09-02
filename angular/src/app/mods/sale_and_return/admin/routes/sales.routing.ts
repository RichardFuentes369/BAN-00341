import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ASSIGN_ADMIN_USERS, 
  PATH_ASSIGN_ADMIN_USERS, 
  TITLE_PATH_ADMIN_USERS, 
  TITLE_PATH_ASSIGN_ADMIN_USERS 
} from '@mod/users/const/users.const';

// componentes
import { TITLE_PATH_SALERETURN_SALES } from '@mod/sale_and_return/const/sale_and_return.const';
import { SoldComponent } from '../pages/sold/sold.component';

export const SalesRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SALERETURN_SALES,
    data: { breadcrumb: null },
    component: SoldComponent,
  },
];
