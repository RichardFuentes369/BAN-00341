import { Routes } from '@angular/router';
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { MeAdminPageProfileComponent } from '@mod/me/admin/pages/profile/profile.component';
import { MeAdminPageSettingsComponent } from '@mod/me/admin/pages/settings/settings.component';
import { BREADCRUMB_PATH_ME_PROFILE, BREADCRUMB_PATH_ME_SETTINGS, PATH_ME_PROFILE, PATH_ME_SETTINGS, TITLE_PATH_ME_PROFILE, TITLE_PATH_ME_SETTINGS } from '../const/me.const';

export const MeRoutes: Routes = [

  {
    path: PATH_ME_PROFILE,
    data: { breadcrumb: BREADCRUMB_PATH_ME_PROFILE },
    title: TITLE_PATH_ME_PROFILE,
    canActivate: [
      adminGuard,
    ],
    component: MeAdminPageProfileComponent,
  },

  {
    path: PATH_ME_SETTINGS,
    data: { breadcrumb: BREADCRUMB_PATH_ME_PROFILE },
    title: TITLE_PATH_ME_SETTINGS,
    canActivate: [
      adminGuard
    ],
    component: MeAdminPageSettingsComponent,
  },

];