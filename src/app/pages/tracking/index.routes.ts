import { Route } from '@angular/router';
import { DashboardViajesPage } from './dashboard-viajes/dashboard-viajes.page';
import { FleetDashboardPage } from './fleet-dashboard/fleet-dashboard.page';
import { FleetMapPage } from './fleet-map/fleet-map.page';
import { FleetStatusPage } from './fleet-status/fleet-status.page';
import { FleetStatusHistoryPage } from './fleet-status-history/fleet-status-history.page';
import { HelpPage } from './help/help.page';
import { TimeDashboardPage } from './time-dashboard/time-dashboard.page';
import { CapasPage } from './management/capas/capas.page';
import { FamiliaSacyrparkPage } from './management/familia-sacyrpark/familia-sacyrpark.page';
import { SiteSelectionPage } from './site-selection/site-selection.page';

export const trackingRoutes: Route = {
  path: 'tracking',
  children: [
    {
      path: 'dashboard-viajes',
      component: DashboardViajesPage,
    },
    {
      path: 'fleet-dashboard',
      component: FleetDashboardPage,
    },
    {
      path: 'fleet-map',
      component: FleetMapPage,
    },
    {
      path: 'fleet-status',
      component: FleetStatusPage,
    },
    {
      path: 'fleet-status-history',
      component: FleetStatusHistoryPage,
    },
    {
      path: 'help',
      component: HelpPage,
    },
    {
      path: 'management-capas',
      component: CapasPage,
    },
    {
      path: 'management-familia-sacyrpark',
      component: FamiliaSacyrparkPage,
    },
    {
      path: 'time-dashboard',
      component: TimeDashboardPage,
    },
    {
      path: 'site-selection',
      component: SiteSelectionPage,
    }
  ],
};
