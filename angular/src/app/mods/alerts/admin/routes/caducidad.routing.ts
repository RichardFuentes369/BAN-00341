import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard';

import { 
  BREADCRUMB_PATH_ASSIGN_ADMIN_USERS, 
  PATH_ASSIGN_ADMIN_USERS, 
  TITLE_PATH_ADMIN_USERS, 
  TITLE_PATH_ASSIGN_ADMIN_USERS 
} from '@mod/users/const/users.const';

// componentes
import { TITLE_PATH_ADMIN_EXPIRATION } from '@mod/alerts/const/alerts.const';
import { VencimientoComponent } from '../pages/vencimiento/vencimiento.component';

export const ExpirationRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_EXPIRATION,
    data: { breadcrumb: null },
    component: VencimientoComponent,
  },
];
