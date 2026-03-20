import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ADMIN_PRODUCT,
  PATH_ADMIN_PRODUCT,
  TITLE_PATH_ADMIN_CATEGORY,
  TITLE_PATH_ADMIN_LOTE,
  TITLE_PATH_ADMIN_PRODUCT, 
} from '@mod/catalog/const/catalog.const';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { LoteComponent } from '../../../lote/admin/pages/lote/lote.component';

export const LoteRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_LOTE,
    data: { breadcrumb: null },
    canActivate: [
      adminGuard
    ],
    component: LoteComponent,
  },
];
