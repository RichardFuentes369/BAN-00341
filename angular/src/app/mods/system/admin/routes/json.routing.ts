import { Routes } from '@angular/router';

// componentes
import { JsonComponent } from '../pages/json/json.component';
import { TITLE_PATH_SYSTEM_JSON } from '@mod/system/const/system.const';

export const JSONRounting: Routes = [
  {
    path: '',
    title: TITLE_PATH_SYSTEM_JSON,
    data: { breadcrumb: null },
    component: JsonComponent,
  },
];
