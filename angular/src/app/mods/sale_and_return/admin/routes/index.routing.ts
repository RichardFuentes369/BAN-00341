import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { BREADCRUMB_PATH_SALERETURN_RETURNS, BREADCRUMB_PATH_SALERETURN_SALES, PATH_SALERETURN_RETURNS, PATH_SALERETURN_SALES, TITLE_PATH_SALE_RETURN_INDEX, TITLE_PATH_SALERETURN_RETURNS, TITLE_PATH_SALERETURN_SALES } from '@mod/sale_and_return/const/sale_and_return.const';

// componentes
import { IndexComponent } from '@mod/sale_and_return/admin/pages/index/index.component';

export const SaleReturnRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SALE_RETURN_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_SALERETURN_SALES,
    title: TITLE_PATH_SALERETURN_SALES,
    data: { breadcrumb: BREADCRUMB_PATH_SALERETURN_SALES },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./sales.routing').then(x=>x.SalesRoutes)
  },
  {
    path: PATH_SALERETURN_RETURNS,
    title: TITLE_PATH_SALERETURN_RETURNS,
    data: { breadcrumb: BREADCRUMB_PATH_SALERETURN_RETURNS },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./return.routing').then(x=>x.ReturnsRoutes)
  },
];
