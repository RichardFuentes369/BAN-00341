import { Routes } from '@angular/router';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { BREADCRUMB_PATH_ADMIN_ANHOS, BREADCRUMB_PATH_ADMIN_TIPOS, PATH_ADMIN_ANHOS, PATH_ADMIN_MONTH, TITLE_PATH_ADMIN_HISTORY } from '@mod/merma/const/loss.conts';
import { AnhosMermaComponent } from '../pages/historico/anhos/anhos.component';
import { MesesMermaComponent } from '../pages/historico/meses/meses.component';

export const RegistroAhosRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_HISTORY,
    data: { breadcrumb: null },
    component: AnhosMermaComponent,
  },
  {
    path: PATH_ADMIN_ANHOS,
    title: TITLE_PATH_ADMIN_HISTORY,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_ANHOS },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./months.routing').then(x=>x.RegistroMesesRoutes)
  },
];
