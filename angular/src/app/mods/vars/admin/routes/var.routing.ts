import { Routes } from '@angular/router';

// componentes
import { VarComponent } from '@mod/vars/admin/pages/var/var.component';
import { TITLE_PATH_SYSTEM_VAR } from '@mod/vars/const/vars.const';

export const VarRouting: Routes = [
  {
    path: '',
    title: TITLE_PATH_SYSTEM_VAR,
    data: { breadcrumb: null },
    component: VarComponent,
  },
];
