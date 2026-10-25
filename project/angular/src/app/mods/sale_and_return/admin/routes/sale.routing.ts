import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { BREADCRUMB_PATH_SALERETURN_RETURNS, BREADCRUMB_PATH_SALERETURN_SALES, PATH_SALERETURN_RETURNS, PATH_SALERETURN_SALES, TITLE_PATH_SALE_RETURN_INDEX, TITLE_PATH_SALERETURN_RETURNS, TITLE_PATH_SALERETURN_SALES } from '@mod/sale_and_return/const/sale_and_return.const';

// componentes
import { SoldComponent } from '../pages/sold/sold.component';

export const SaleReturnRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SALERETURN_SALES,
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: SoldComponent,
  },
];
