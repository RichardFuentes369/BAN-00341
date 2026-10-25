import { Routes } from '@angular/router';
import { MeAdminPageProfileComponent } from '@mod/me/admin/pages/profile/profile.component';
import { MeAdminPageSettingsComponent } from '@mod/me/admin/pages/settings/settings.component';
import { BREADCRUMB_PATH_ME_PROFILE, BREADCRUMB_PATH_ME_SETTINGS, PATH_ME_PROFILE, PATH_ME_SETTINGS, TITLE_PATH_ME_PROFILE, TITLE_PATH_ME_SETTINGS } from '@mod/me/const/me.const';
import { finalGuard } from '@guard/roles/final/final.guard';
import { MeFinalPageProfileComponent } from '@mod/me/final/pages/profile/profile.component';
import { MeFinalPageSettingsComponent } from '@mod/me/final/pages/settings/settings.component';

export const MeRoutes: Routes = [

  {
    path: PATH_ME_PROFILE,
    data: { breadcrumb: BREADCRUMB_PATH_ME_PROFILE },
    title: TITLE_PATH_ME_PROFILE,
    canActivate: [
      finalGuard
    ],
    component: MeFinalPageProfileComponent,
  },

  {
    path: PATH_ME_SETTINGS,
    data: { breadcrumb: BREADCRUMB_PATH_ME_PROFILE },
    title: TITLE_PATH_ME_SETTINGS,
    canActivate: [
      finalGuard
    ],
    component: MeFinalPageSettingsComponent,
  },

];