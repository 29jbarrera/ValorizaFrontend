import { Route } from '@angular/router';
import { PartesTrabajoComponent } from './partes-trabajo/partes-trabajo.component';
import { SegurosComponent } from './seguros/seguros.component';
import { MarcasComponent } from './marcas/marcas.component';
import { CategoriasComponent } from './categorias/categorias.component';
import { ImpuestosComponent } from './impuestos/impuestos.component';
import { DepositosComponent } from './depositos/depositos.component';
import { RepostajesMaquinariaComponent } from './repostajes-maquinaria/repostajes.component';
import { ProveedoresComponent } from './proveedores/proveedores.component';
import { MaterialesComponent } from './materiales/materiales.component';
import { CambioCentroComponent } from './cambio-centro/cambio-centro.component';
import { RepostajeVehiculosComponent } from './repostaje-vehiculos/repostaje-vehiculos.component';
import { ParteTrabajoPage} from './partes-trabajo/parte-trabajo/parte-trabajo.page';

export const managementRoute: Route = {
  path: 'management',
  children: [
    {
      path: 'seguros',
      component: SegurosComponent,
    },
    { path: 'partes-trabajo', component: PartesTrabajoComponent },
    {
      path: 'partes-trabajo/:id',
      component: ParteTrabajoPage,
    },
    {
      path: 'marcas',
      component: MarcasComponent,
    },
    {
      path: 'categorias',
      component: CategoriasComponent,
    },
    {
      path: 'impuestos',
      component: ImpuestosComponent,
    },
    {
      path: 'depositos',
      component: DepositosComponent,
    },
    {
      path: 'repostajes-maquinaria',
      component: RepostajesMaquinariaComponent,
    },
    {
      path: 'repostajes-vehiculos',
      component: RepostajeVehiculosComponent,
    },
    {
      path: 'proveedores',
      component: ProveedoresComponent,
    },
    {
      path: 'materiales',
      component: MaterialesComponent,
    },
    {
      path: 'cambio-centro',
      component: CambioCentroComponent,
    },
  ],
};
