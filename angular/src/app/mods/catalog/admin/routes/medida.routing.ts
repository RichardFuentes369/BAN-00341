import { Routes } from '@angular/router';

import { 
  BREADCRUMB_PATH_ASSIGN_PRODUCT_USERS,
  PATH_ASSIGN_PRODUCT_USERS,
    TITLE_PATH_ADMIN_BRAND,
    TITLE_PATH_ADMIN_EXTENT,
    TITLE_PATH_ASSIGN_PRODUCT_USERS,
} from '@mod/catalog/const/catalog.const';

// componentes
import { MedidaComponent } from '../pages/medida/medida.component';

export const CatalogoMedidaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_EXTENT,
    data: { breadcrumb: null },
    component: MedidaComponent,
  },
];
