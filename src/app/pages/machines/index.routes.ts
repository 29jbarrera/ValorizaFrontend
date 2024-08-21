import { Route } from '@angular/router';
import { HorometrosKilometrosComponent } from './horometros-kilometros/horometros-kilometros.component';
import { PreventivoComponent } from './preventivo/preventivo.component';
import { ReparacionesComponent } from './reparaciones/reparaciones.component';
import { ReparacionesCentroComponent } from './reparaciones-centro/reparaciones-centro.component';
import { GastosComponent } from './gastos/gastos.component';
import { TasasComponent } from './tasas/tasas.component';
import { TasasCentrosComponent } from './tasas-centros/tasas-centros.component';
import { RatiosMaquinariaComponent } from './ratios-maquinaria/ratios-maquinaria.component';
import { RatiosCentroComponent } from './ratios-centro/ratios-centro.component';
import { InstalacionesComponent } from './instalaciones/instalaciones.component';
import { ItvsComponent } from './itvs/itvs.component';
import { TacografosComponent } from './tacografos/tacografos.component';
import { GncComponent } from './gnc/gnc.component';
import { GruasComponent } from './gruas/gruas.component';
import { StockComponent } from './stock/stock.component';
import { MaquinariasPage } from './maquinarias/maquinarias.page';
import { MaquinariaPage } from './maquinarias/maquinaria/maquinaria.page';

export const machineRoute: Route = {
  path: 'machines',
  children: [
    // 1º Vuelta
    {
      path: 'horometros-kilometros',
      component: HorometrosKilometrosComponent,
    },
    // TODO
    { path: 'preventivo', component: PreventivoComponent },
    { path: 'reparaciones', component: ReparacionesComponent },
    {
      path: 'reparaciones-centro',
      component: ReparacionesCentroComponent,
    },
    // 1º Vuelta
    { path: 'gastos-taller', component: GastosComponent },
    // TODO
    { path: 'tasas', component: TasasComponent },
    { path: 'tasas-centro', component: TasasCentrosComponent },
    { path: 'ratios-maquinaria', component: RatiosMaquinariaComponent },
    { path: 'ratios-centro', component: RatiosCentroComponent },
    { path: 'instalaciones', component: InstalacionesComponent },
    { path: 'itvs', component: ItvsComponent },
    { path: 'tacografos', component: TacografosComponent },
    // 1º Vuelta
    { path: 'gnc', component: GncComponent },
    { path: 'gruas', component: GruasComponent },
    { path: 'stock', component: StockComponent },
    { path: 'maquinarias', component: MaquinariasPage },
    {
      path: 'maquinarias/:id',
      component: MaquinariaPage,
    },
  ],
};
