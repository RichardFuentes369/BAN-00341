import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { ModulosComponent as ModulosIndex } from '@mod/modules/admin/pages/modulos/modulos.component';
import { BREADCRUMB_PATH_ADMIN_PERMISSIONS, BREADCRUMB_PATH_SUBMODULES, PATH_ADMIN_PERMISSIONS, PATH_SUBMODULES, TITLE_PATH_ADMIN_PERMISSIONS, TITLE_PATH_SUBMODULES } from '@mod/modules/const/modules.const';

export const ModulosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: ModulosIndex,
  },
  {
    path: PATH_SUBMODULES,
    title: TITLE_PATH_SUBMODULES,
    canActivate: [
      adminGuard
    ],
    data: { breadcrumb: BREADCRUMB_PATH_SUBMODULES },
    loadChildren: () => import('./submodulos.routing').then(x=>x.SubModulosRoutes)
  },
  {
    path: PATH_ADMIN_PERMISSIONS,
    title: TITLE_PATH_ADMIN_PERMISSIONS,
    canActivate: [
      adminGuard
    ],
    data: { breadcrumb: BREADCRUMB_PATH_ADMIN_PERMISSIONS },
    loadChildren: () => import('./permisos.routing').then(x=>x.PermisosRoutes)
  },
];
