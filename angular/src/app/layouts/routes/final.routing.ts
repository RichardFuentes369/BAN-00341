import { Routes } from '@angular/router';

import { finalGuard } from '@guard/roles/final/final.guard';

//componentes
import { MeFinalPageProfileComponent } from '@mod/me/final/pages/profile/profile.component'
import { MeFinalPageSettingsComponent } from '@mod/me/final/pages/settings/settings.component'

export const FinalLayoutRoutes: Routes = [
  // >> Me
  // {
  //   path: 'me',
  //   title: 'Menu',
  //   data: { breadcrumb: BREADCRUMB_PATH_MENU }, 
  //   component: MenuAdminComponent,
  //   canActivate: [
  //     adminGuard
  //   ],
  // },
];
