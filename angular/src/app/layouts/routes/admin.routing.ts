import { Routes } from '@angular/router';

import { adminGuard } from '@guard/roles/admin/admin.guard'

//componentes
import { MeAdminPageProfileComponent } from '@mod/me/admin/pages/profile/profile.component'
import { MeAdminPageSettingsComponent } from '@mod/me/admin/pages/settings/settings.component'

import { MenuAdminComponent } from '@mod/main/admin/pages/menu/menu.component'
import { AdminPermissionComponent } from '@component/globales/permission/admin/admin.component';
import { BREADCRUMB_PATH_DASHBOARD, BREADCRUMB_PATH_PROFILE, BREADCRUMB_PATH_SETTINGS } from '@mod/main/const/main.const';
import { BREADCRUMB_PATH_MENU } from '@const/app.const';
import { AdminDashboardComponent } from '@mod/dashboard/admin/admin.component';


export const AdminLayoutRoutes: Routes = [

  /*
  * Template
  */
  {
    path: '',
    redirectTo: 'me/perfil',
    pathMatch: 'full',
  },
  {
    path: 'me/perfil',
    title: 'Perfil',
    data: { breadcrumb: BREADCRUMB_PATH_PROFILE },
    component: MeAdminPageProfileComponent,
    canActivate: [
      adminGuard
    ]
  },
  {
    path: 'me/configuracion',
    title: 'Configuracion',
    data: { breadcrumb: BREADCRUMB_PATH_SETTINGS },
    component: MeAdminPageSettingsComponent,
    canActivate: [
      adminGuard
    ]
  },  
  {
    path: 'permiso',
    title: 'Sin permiso',
    component: AdminPermissionComponent,
    canActivate: [
      adminGuard
    ]
  }, 

  // Dashboard
  
  {
    path: 'dashboard',
    title: 'Dashboard',
    data: { breadcrumb: BREADCRUMB_PATH_DASHBOARD },
    component: AdminDashboardComponent,
    canActivate: [
      adminGuard
    ]
  }, 

  // Modulos

  // >> Menu
  {
    path: 'mod',
    title: 'Menu',
    data: { breadcrumb: BREADCRUMB_PATH_MENU }, 
    component: MenuAdminComponent,
    canActivate: [
      adminGuard
    ],
  },

];
