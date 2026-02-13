  import { Routes } from '@angular/router';
  import { adminGuard } from '@guard/roles/admin/admin.guard';
  import { BREADCRUMB_PATH_CATALOG, BREADCRUMB_PATH_MODULES, BREADCRUMB_PATH_STOCK, BREADCRUMB_PATH_USERS, PATH_CATALOG, PATH_MODULES, PATH_STOCK, PATH_USERS, TITLE_PATH_CATALOG, TITLE_PATH_MODULES, TITLE_PATH_STOCK, TITLE_PATH_USERS } from '@mod/main/const/main.const';

  export const MenuRoutes: Routes = [

    // Modulo Usuarios
    {
      path: PATH_USERS,
      title: TITLE_PATH_USERS,
      data: { breadcrumb: BREADCRUMB_PATH_USERS },
      loadChildren: () => import('@mod/users/admin/routes/index.routing').then(x=>x.UsuariosRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Catalogo
    {
      path: PATH_CATALOG,
      title: TITLE_PATH_CATALOG,
      data: { breadcrumb: BREADCRUMB_PATH_CATALOG },
      loadChildren: () => import('@mod/catalog/admin/routes/index.routing').then(x=>x.CatalogRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Existencia
    {
      path: PATH_STOCK,
      title: TITLE_PATH_STOCK,
      data: { breadcrumb: BREADCRUMB_PATH_STOCK },
      loadChildren: () => import('@mod/stock/admin/routes/index.routing').then(x=>x.CatalogRoutes),
      canActivate: [
        adminGuard
      ]
    },

    // Modulo Modulos
    {
      path: PATH_MODULES,
      title: TITLE_PATH_MODULES,
      data: { breadcrumb: BREADCRUMB_PATH_MODULES },
      loadChildren: () => import('@mod/modules/admin/routes/modulos.routing').then(x=>x.ModulosRoutes),
      canActivate: [
        adminGuard
      ]
    },
  ];