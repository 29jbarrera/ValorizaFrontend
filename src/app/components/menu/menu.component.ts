import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { LogotypeComponent } from '../logotype/logotype.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';

type MenuItem = {
  name: string;
  path: string;
  items: {
    class: string;
    name: string;
    path: string;
    id: string;
    n: number;
    status: {
      edit: boolean | null;
      add: boolean | null;
      delete: boolean | null;
      table: boolean | null;
      filter: boolean | null;
      excel: boolean | null;
    };
  }[];
};

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RippleModule,
    InputTextModule,
    BadgeModule,
    // StyleClassModule,
    ButtonModule,
    RouterModule,
    LogotypeComponent,
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  menu_items: MenuItem[] = [
    {
      name: 'Mantenimiento',
      path: 'machines',
      items: [
        {
          class: 'fas fa-list',
          name: 'Stock',
          path: 'stock',
          id: 'menu-item-stock',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-tools',
          name: 'Instalaciones',
          path: 'instalaciones',
          id: 'menu-item-instalaciones',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-truck',
          name: 'Grúas',
          path: 'gruas',
          id: 'menu-item-gruas',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: true,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-tools',
          name: 'Gastos Taller',
          path: 'gastos-taller',
          id: 'menu-item-gastos-taller',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-tachometer-alt',
          name: 'Horómetros',
          path: 'horometros-kilometros',
          id: 'menu-item-horometros-kilometros',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: true,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-tachometer-alt',
          name: 'Preventivo',
          path: 'preventivo',
          id: 'menu-item-preventivo',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: null,
            delete: null,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-tools',
          name: 'Reparaciones',
          path: 'reparaciones',
          id: 'menu-item-reparaciones',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-tools',
          name: 'Reparaciones centro',
          path: 'reparaciones-centro',
          id: 'menu-item-reparaciones-centro',
          n: Math.round(Math.random() * 100),
          status: {
            edit: null,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: null,
          },
        },
        {
          class: 'fas fa-tachometer-alt',
          name: 'Tacógrafos',
          path: 'tacografos',
          id: 'menu-item-tacografos',
          n: Math.round(Math.random() * 100),
          status: {
            edit: null,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: true,
          },
        },
        // {
        //   class: 'fas fa-hand-holding-usd',
        //   name: 'Tasas',
        //   path: 'tasas',
        //   id: 'menu-item-tasas',
        //   n: Math.round(Math.random() * 100),
        //   status: {
        //     edit: true,
        //     add: null,
        //     delete: null,
        //     table: false,
        //     filter: false,
        //     excel: false,
        //   },
        // },
        // {
        //   class: 'fas fa-hand-holding-usd',
        //   name: 'Tasas centro',
        //   path: 'tasas-centro',
        //   id: 'menu-item-tasas-centro',
        //   n: Math.round(Math.random() * 100),
        //   status: {
        //     edit: null,
        //     add: null,
        //     delete: null,
        //     table: false,
        //     filter: false,
        //     excel: false,
        //   },
        // },
        // {
        //   class: 'fas fa-list',
        //   name: 'Ratios centro',
        //   path: 'ratios-centro',
        //   id: 'menu-item-ratios-centro',
        //   n: Math.round(Math.random() * 100),
        //   status: {
        //     edit: null,
        //     add: null,
        //     delete: null,
        //     table: false,
        //     filter: false,
        //     excel: false,
        //   },
        // },
        // {
        //   class: 'fas fa-list',
        //   name: 'Ratios maquinaria',
        //   path: 'ratios-maquinaria',
        //   id: 'menu-item-ratios-maquinaria',
        //   n: Math.round(Math.random() * 100),
        //   status: {
        //     edit: null,
        //     add: null,
        //     delete: null,
        //     table: false,
        //     filter: false,
        //     excel: false,
        //   },
        // },
        {
          class: 'fas fa-gas-pump',
          name: 'GNC',
          path: 'gnc',
          id: 'menu-item-gnc',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-car',
          name: 'ITVs',
          path: 'itvs',
          id: 'menu-item-itvs',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-truck-monster',
          name: 'Maquinarias',
          path: 'maquinarias',
          id: 'menu-item-maquinaria',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: true,
            filter: false,
            excel: false,
          },
        },
      ],
    },
    {
      name: 'Gestion',
      path: 'management',
      items: [
        {
          class: 'fas fa-shapes',
          name: 'Marcas',
          path: 'marcas',
          id: 'menu-item-marcas',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: null,
            excel: true,
          },
        },
        {
          class: 'fas fa-layer-group',
          name: 'Categorías',
          path: 'categorias',
          id: 'menu-item-categorias',
          n: Math.round(Math.random() * 100),
          status: {
            edit: null,
            add: null,
            delete: true,
            table: true,
            filter: null,
            excel: true,
          },
        },
        {
          class: 'fas fa-shield-alt',
          name: 'Seguros',
          path: 'seguros',
          id: 'menu-item-seguros',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-hand-holding-usd',
          name: 'Impuesto',
          path: 'impuestos',
          id: 'menu-item-impuestos',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: true,
          },
        },
        {
          class: 'fas fa-receipt',
          name: 'Depósitos',
          path: 'depositos',
          id: 'menu-item-depositos',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: true,
            filter: false,
            excel: false,
          },
        },
        // {
        //   class: 'fas fa-file-invoice-dollar',
        //   name: 'Repostajes maquinaria',
        //   path: 'repostajes-maquinaria',
        //   id: 'menu-item-repostajes-maquinaria',
        //   n: Math.round(Math.random() * 100),
        //   status: {
        //     edit: false,
        //     add: false,
        //     delete: false,
        //     table: false,
        //     filter: false,
        //     excel: false,
        //   },
        // },
        {
          class: 'fas fa-file-invoice-dollar',
          name: 'Repostajes (Repostajes vehículos)',
          path: 'repostajes-vehiculos',
          id: 'menu-item-repostajes-vehiculos',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-user-tie',
          name: 'Proveedores',
          path: 'proveedores',
          id: 'menu-item-proveedores',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: false,
            excel: true,
          },
        },
        // {
        //   class: 'fas fa-building',
        //   name: 'Centro',
        //   path: 'gnc',
        //   n: Math.round(Math.random() * 100),
        // status: {edit: false,add: false,delete: false,table: false,filter: false,excel: false}
        // },
        {
          class: 'fas fa-cogs',
          name: 'Referencia materiales',
          path: 'materiales',
          id: 'menu-item-materiales',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: true,
            excel: true,
          },
        },
        {
          class: 'fas fa-book',
          name: 'Partes de trabajo',
          path: 'partes-trabajo',
          id: 'menu-item-partes-trabajo',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: true,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-book',
          name: 'Cambio Centro',
          path: 'cambio-centro',
          id: 'menu-item-cambio-centro',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: null,
            delete: null,
            table: true,
            filter: false,
            excel: false,
          },
        },
      ],
    },
    {
      name: 'Administración',
      path: 'administration',
      items: [
        {
          class: 'fas fa-users',
          name: 'Familias y Subfamilias',
          path: 'familias-subfamilias',
          id: 'menu-item-familias-subfamilias',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: null,
            excel: null,
          },
        },
        {
          class: 'fas fa-clock',
          name: 'Límite avisos',
          path: 'limite-avisos',
          id: 'menu-item-limite-avisos',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: null,
            delete: true,
            table: true,
            filter: null,
            excel: null,
          },
        },
        {
          class: 'fas fa-layer-group',
          name: 'Niveles de acción',
          path: 'niveles-accion',
          id: 'menu-item-niveles-accion',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: null,
          },
        },
        {
          class: 'fas fa-sort-amount-up',
          name: 'Niveles',
          path: 'niveles',
          id: 'menu-item-niveles',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-globe',
          name: 'Tablas Globales',
          path: 'globales',
          id: 'menu-item-globales',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: true,
            table: true,
            filter: null,
            excel: null,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'Unidades',
          path: 'unidades',
          id: 'menu-item-unidades',
          n: Math.round(Math.random() * 100),
          status: {
            edit: true,
            add: true,
            delete: true,
            table: true,
            filter: null,
            excel: true,
          },
        },
      ],
    },
    {
      name: 'Iot Provisioning',
      path: 'iot-provisioning',
      items: [
        {
          class: 'fas fa-users',
          name: 'Dashboard',
          path: 'dashboard',
          id: 'menu-item-dashboard',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-clock',
          name: 'iot-hub',
          path: 'iot-hub',
          id: 'menu-item-iot-hub',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-layer-group',
          name: 'gateways',
          path: 'gateways',
          id: 'menu-item-gateways',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-sort-amount-up',
          name: 'invocation-definitions',
          path: 'invocation-definitions',
          id: 'menu-item-invocation-definitions',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-globe',
          name: 'gateways-not-provisioned',
          path: 'gateways-not-provisioned',
          id: 'menu-item-gateways-not-provisioned',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'help',
          path: 'help',
          id: 'menu-item-help',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
      ],
    },
    {
      name: 'Tracking',
      path: 'tracking',
      items: [
        {
          class: 'fas fa-users',
          name: 'dashboard-viajes',
          path: 'dashboard-viajes',
          id: 'menu-item-dashboard-viajes',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-clock',
          name: 'fleet-dashboard',
          path: 'fleet-dashboard',
          id: 'menu-item-fleet-dashboard',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-layer-group',
          name: 'fleet-map',
          path: 'fleet-map',
          id: 'menu-item-fleet-map',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-sort-amount-up',
          name: 'fleet-status',
          path: 'fleet-status',
          id: 'menu-item-fleet-status',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-globe',
          name: 'fleet-status-history',
          path: 'fleet-status-history',
          id: 'menu-item-fleet-status-history',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'help',
          path: 'help',
          id: 'menu-item-help',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'management-capas',
          path: 'management-capas',
          id: 'menu-item-management-capas',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'management-familia-sacyrpark',
          path: 'management-familia-sacyrpark',
          id: 'menu-item-management-familia-sacyrpark',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'time-dashboard',
          path: 'time-dashboard',
          id: 'menu-item-time-dashboard',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
        {
          class: 'fas fa-calculator',
          name: 'site-selection',
          path: 'site-selection',
          id: 'menu-item-site-selection',
          n: Math.round(Math.random() * 100),
          status: {
            edit: false,
            add: false,
            delete: false,
            table: false,
            filter: false,
            excel: false,
          },
        },
      ],
    },
  ];

  account = this.authService.instance.getActiveAccount();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  get_if_path_is_active(item: any, item2: any) {
    const path = '/authenticated/' + item.path + '/' + item2.path;
    return path === this.router.url;
  }

  navigate(item: any, item2: any) {
    this.router.navigate(['authenticated', item.path, item2.path]);
  }

  get_status(item: MenuItem['items'][0]) {
    return Object.keys(item.status).map((key: string) => key);
  }

  get_abreviation(key: string) {
    if (key === 'excel') {
      return 'X';
    }
    return key.substring(0, 1).toUpperCase();
  }

  get_background_color(item: MenuItem['items'][0], key: string) {
    const status = item.status[key as keyof typeof item.status];
    if (status === true) {
      return 'hecho';
    }
    if (status === false) {
      return 'no-hecho';
    }
    return 'no-procede';
  }
}
