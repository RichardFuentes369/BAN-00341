import { Routes } from '@angular/router';
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { BREADCRUMB_PATH_SYSTEM_JSON, BREADCRUMB_PATH_SYSTEM_VAR, PATH_SYSTEM_JSON, PATH_SYSTEM_VAR, TITLE_PATH_SYSTEM_INDEX, TITLE_PATH_SYSTEM_JSON, TITLE_PATH_SYSTEM_VAR } from '@mod/system/const/system.const';
import { IndexComponent } from '@mod/system/admin/pages/index/index.component';

export const SystemRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_SYSTEM_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_SYSTEM_VAR,
    title: TITLE_PATH_SYSTEM_VAR,
    data: { breadcrumb: BREADCRUMB_PATH_SYSTEM_VAR },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./var.routing').then(x=>x.VarRouting)
  },
  {
    path: PATH_SYSTEM_JSON,
    title: TITLE_PATH_SYSTEM_JSON,
    data: { breadcrumb: BREADCRUMB_PATH_SYSTEM_JSON },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./json.routing').then(x=>x.JSONRounting)
  },
];