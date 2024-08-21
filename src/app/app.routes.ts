import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthenticatedComponent } from './pages/authenticated/authenticated.component';
import { UnauthenticatedComponent } from './pages/unauthenticated/unauthenticated.component';
import { MsalGuard } from '@azure/msal-angular';
import { machineRoute } from './pages/machines/index.routes';
import { managementRoute } from './pages/management/index.routes';
import { administrationRoute } from './pages/administration/index.routes';
import { iotProvisioningRoute } from './pages/iot-provisioning/index.routes';
import { trackingRoutes } from './pages/tracking/index.routes';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: UnauthenticatedComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [MsalGuard],
  },
  {
    path: 'authenticated',
    component: AuthenticatedComponent,
    children: [
      machineRoute,
      managementRoute,
      administrationRoute,
      iotProvisioningRoute,
      trackingRoutes,
    ],
    canActivate: [MsalGuard],
  },
  {
    path: '**',
    redirectTo: 'authenticated/machines/stock',
  },
];
