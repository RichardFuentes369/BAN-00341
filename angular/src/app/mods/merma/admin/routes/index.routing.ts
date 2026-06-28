import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { IndexComponent } from '@mod/merma/admin/pages/index/index.component';
import { BREADCRUMB_PATH_ADMIN_ANHOS, BREADCRUMB_PATH_ADMIN_HISTORY, BREADCRUMB_PATH_ADMIN_REGISTRO, BREADCRUMB_PATH_ADMIN_TIPOS, PATH_ADMIN_ANHOS, PATH_ADMIN_HISTORY, PATH_ADMIN_REGISTRO, PATH_ADMIN_TIPOS, TITLE_PATH_ADMIN_ANHOS, TITLE_PATH_ADMIN_HISTORY, TITLE_PATH_ADMIN_REGISTRO, TITLE_PATH_ADMIN_TIPOS, TITLE_PATH_MERMA_INDEX } from '@mod/merma/const/loss.conts';

export const MermaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_MERMA_INDEX,
    data: { breadcrumb: null },
    component: IndexComponent,
  },
  {
    path: PATH_ADMIN_TIPOS,
    title: TITLE_PATH_ADMIN_TIPOS,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_TIPOS },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./tipos.routing').then(x=>x.TiposMermaRoutes)
  },
  {
    path: PATH_ADMIN_HISTORY,
    title: TITLE_PATH_ADMIN_HISTORY,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_HISTORY },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./anhos.routing').then(x=>x.RegistroAhosRoutes)
  },
  {
    path: PATH_ADMIN_REGISTRO,
    title: TITLE_PATH_ADMIN_REGISTRO,
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_REGISTRO },
    canActivate: [
      adminGuard
    ],
    loadChildren: () => import('./registro.routing').then(x=>x.RegistroMermaRoutes)
  },
];
