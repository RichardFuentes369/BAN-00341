import { Routes } from '@angular/router';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { TITLE_PATH_ADMIN_TIPOS } from '@mod/merma/const/loss.conts';
import { TipoMermaComponent } from '../pages/tipo/tipo.component';

export const TiposMermaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_TIPOS,
    data: { breadcrumb: null },
    component: TipoMermaComponent,
  },
];
