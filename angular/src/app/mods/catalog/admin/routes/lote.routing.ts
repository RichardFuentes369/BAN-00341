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
import { LoteComponent } from '../pages/lote/lote.component';

export const CatalogoLoteRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_LOTE,
    data: { breadcrumb: null },
    component: LoteComponent,
  },
];
