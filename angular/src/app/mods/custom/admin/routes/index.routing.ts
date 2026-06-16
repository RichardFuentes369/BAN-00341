import { Routes } from '@angular/router';
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { TITLE_PATH_ADMIN_CUSTOM } from '@mod/custom/const/custom.const';
import { IndexComponent } from '@mod/custom/admin/pages/index/index.component';

export const CustomRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_CUSTOM,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
];
