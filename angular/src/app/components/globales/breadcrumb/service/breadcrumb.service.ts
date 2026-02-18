import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { BREADCRUMB_PATH_ADMIN_CATEGORY } from '@mod/catalog/const/catalog.const';
import { BREADCRUMB_PATH_SUBMODULES } from '@mod/modules/const/modules.const';
import { BREADCRUMB_PATH_ASSIGN_ADMIN_USERS } from '@mod/users/const/users.const';
import { BehaviorSubject } from 'rxjs';
import { filter } from 'rxjs/operators';

export interface Breadcrumb {
  label: string;
  url: string;
  queryParams?: any;
}

@Injectable({ providedIn: 'root' })
export class BreadcrumbService {
  private breadcrumbs = new BehaviorSubject<Breadcrumb[]>([]);

  breadcrumbs$ = this.breadcrumbs.asObservable();

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      const root = this.router.routerState.snapshot.root;
      const breadcrumbs: Breadcrumb[] = [];
      this.addBreadcrumbs(root, breadcrumbs);
      this.breadcrumbs.next(breadcrumbs);
    });
  }

  private addBreadcrumbs(route: ActivatedRouteSnapshot, breadcrumbs: Breadcrumb[], url: string = '') {
    const children: ActivatedRouteSnapshot[] = route.children;
    if (children.length === 0) return;

    for (const child of children) {
      const routeURL: string = child.url.map(segment => segment.path).join('/');
      if (routeURL !== '') {
        url += `/${routeURL}`;
      }

      const label = child.data['breadcrumb'];
      if (label) {
        
        let params = { ...child.queryParams };
        if (label === 'Modulos') {
          delete params['id_submodule'];
          delete params['id_module'];
        }
        if (label === BREADCRUMB_PATH_SUBMODULES) {
          delete params['id_submodule'];
        }
        if (label === BREADCRUMB_PATH_ADMIN_CATEGORY) {
          delete params['id_category'];
        }
        if (label === BREADCRUMB_PATH_ASSIGN_ADMIN_USERS) {
          delete params['id_user'];
        }

        breadcrumbs.push({
          label: label,
          url: url,
          queryParams: params
        });
      }
      this.addBreadcrumbs(child, breadcrumbs, url);
    }
  }
}