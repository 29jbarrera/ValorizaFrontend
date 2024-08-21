import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { IotHubPage } from './iot-hub/iot-hub.page';
import { GatewaysPage } from './gateways/gateways.page';
import { InvocationDefinitionsPage } from './invocation-definitions/invocation-definitions.page';
import { GatewaysNotProvisionedPage } from './gateways-not-provisioned/gateways-not-provisioned.page';
import { HelpPage } from './help/help.page';

export const iotProvisioningRoute: Route = {
  // canActivate: [MsalGuard],
  path: 'iot-provisioning',
  children: [
    {
      path: 'dashboard',
      component: DashboardComponent,
    },
    {
      path: 'iot-hub',
      component: IotHubPage,
    },
    {
      path: 'gateways',
      component: GatewaysPage,
    },
    {
      path: 'invocation-definitions',
      component: InvocationDefinitionsPage,
    },
    {
      path: 'gateways-not-provisioned',
      component: GatewaysNotProvisionedPage,
    },
    {
      path: 'help',
      component: HelpPage,
    },
  ],
};
