import { Route } from '@angular/router';
import { FamiliasSubfamiliasComponent } from './familias-subfamilias/familias-subfamilias.component';
import { LimiteAvisosComponent } from './limite-avisos/limite-avisos.component';
import { NivelesAccionComponent } from './niveles-accion/niveles-accion.component';
import { NivelesComponent } from './niveles/niveles.component';
import { TablasGlobalesComponent } from './tablas-globales/tablas-globales.component';
import { UnidadesComponent } from './unidades/unidades.component';

export const administrationRoute: Route = {
  path: 'administration',
  children: [
    {
      path: 'familias-subfamilias',
      component: FamiliasSubfamiliasComponent,
    },
    {
      path: 'limite-avisos',
      component: LimiteAvisosComponent,
    },
    {
      path: 'niveles-accion',
      component: NivelesAccionComponent,
    },
    {
      path: 'niveles',
      component: NivelesComponent,
    },
    {
      path: 'globales',
      component: TablasGlobalesComponent,
    },
    {
      path: 'unidades',
      component: UnidadesComponent,
    },
  ],
};
