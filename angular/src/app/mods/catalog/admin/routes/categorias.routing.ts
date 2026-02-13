import { Routes } from '@angular/router';

import { 
  TITLE_PATH_ADMIN_CATEGORY, 
} from '@mod/catalog/const/catalog.const';

// componentes
import { CategoriasComponent } from '@mod/catalog/admin/pages/categorias/categorias.component';

export const CatalogoCategoriasRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_CATEGORY,
    data: { breadcrumb: null },
    component: CategoriasComponent,
  },
];
