import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

// componentes
import { SubmodulosComponent as SubmoduloIndex } from '@mod/modules/admin/pages/submodulos/submodulos.component';
import { BREADCRUMB_PATH_ADMIN_PERMISSIONS, PATH_ADMIN_PERMISSIONS, TITLE_PATH_ADMIN_PERMISSIONS } from '@mod/modules/const/modules.const';

export const SubModulosRoutes: Routes = [
  {
    path: '',
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: SubmoduloIndex,
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
