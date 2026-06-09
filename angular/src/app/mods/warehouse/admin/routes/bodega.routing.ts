import { Routes } from '@angular/router';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { WarehoseComponent } from '@mod/warehouse/admin/pages/warehouse/warehouse.component';
import { TITLE_PATH_WAREHOUSE } from '@mod/main/const/main.const';

export const BodegaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_WAREHOUSE,
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: WarehoseComponent,
  },
];
