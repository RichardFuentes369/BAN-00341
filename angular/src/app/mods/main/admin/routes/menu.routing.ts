  import { Routes } from '@angular/router';
  import { adminGuard } from '@guard/roles/admin/admin.guard';
  import { 
    BREADCRUMB_PATH_CATALOG, 
    BREADCRUMB_PATH_WAREHOUSE, 
    BREADCRUMB_PATH_MERMA, 
    BREADCRUMB_PATH_MODULES, 
    BREADCRUMB_PATH_USERS, 
    PATH_CATALOG, 
    PATH_MERMA, 
    PATH_MODULES, 
    PATH_USERS, 
    PATH_WAREHOUSE, 
    TITLE_PATH_CATALOG, 
    TITLE_PATH_MERMA, 
    TITLE_PATH_MODULES, 
    TITLE_PATH_USERS, 
    TITLE_PATH_WAREHOUSE
  } from '@mod/main/const/main.const';

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

    // Modulo Merma
    {
      path: PATH_MERMA,
      title: TITLE_PATH_MERMA,
      data: { breadcrumb: BREADCRUMB_PATH_MERMA },
      loadChildren: () => import('@mod/merma/admin/routes/index.routing').then(x=>x.MermaRoutes),
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

    // Modulo Lote
    {
      path: PATH_WAREHOUSE,
      title: TITLE_PATH_WAREHOUSE,
      data: { breadcrumb: BREADCRUMB_PATH_WAREHOUSE },
      loadChildren: () => import('@mod/warehouse/admin/routes/bodega.routing').then(x=>x.BodegaRoutes),
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