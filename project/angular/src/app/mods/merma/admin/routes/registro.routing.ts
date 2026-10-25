import { Routes } from '@angular/router';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { TITLE_PATH_ADMIN_REGISTRO } from '@mod/merma/const/loss.conts';
import { RegistroMermaComponent } from '../pages/registro/registro.component';

export const RegistroMermaRoutes: Routes = [
  {
    path: '',
    title: TITLE_PATH_ADMIN_REGISTRO,
    data: { breadcrumb: null },
    component: RegistroMermaComponent,
  },
];
