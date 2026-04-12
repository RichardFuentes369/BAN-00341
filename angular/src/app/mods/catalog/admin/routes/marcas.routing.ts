import { Routes } from '@angular/router';

import { 
    TITLE_PATH_ADMIN_BRAND,
} from '@mod/catalog/const/catalog.const';

// componentes
import { MarcasComponent } from '../pages/marcas/marcas.component';

export const CatalogoMarcasRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_BRAND,
    data: { breadcrumb: null },
    component: MarcasComponent,
  },
];
