import { Routes } from '@angular/router';

// componentes
import { adminGuard } from '@guard/roles/admin/admin.guard';
import { BREADCRUMB_PATH_ADMIN_ANHOS, BREADCRUMB_PATH_ADMIN_MONTH, BREADCRUMB_PATH_ADMIN_TIPOS, PATH_ADMIN_MONTH, TITLE_PATH_ADMIN_HISTORY } from '@mod/merma/const/loss.conts';
import { AnhosMermaComponent } from '../pages/historico/anhos/anhos.component';
import { MesesMermaComponent } from '../pages/historico/meses/meses.component';
import { RegistroMermaComponent } from '../pages/registro/registro.component';

export const RegistroMesesRoutes: Routes = [
    {
        path: '',
        title: TITLE_PATH_ADMIN_HISTORY,
        data: { breadcrumb: null },
        component: MesesMermaComponent,
    },
    {
        path: PATH_ADMIN_MONTH,
        title: TITLE_PATH_ADMIN_HISTORY,
        data: { breadcrumb: BREADCRUMB_PATH_ADMIN_MONTH },
        canActivate: [
            adminGuard
        ],
        component: RegistroMermaComponent,
    },
];
