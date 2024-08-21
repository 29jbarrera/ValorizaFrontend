import { Component } from '@angular/core';
import { RepostajeVehiculosTableComponent } from './repostaje-vehiculos-table/repostaje-vehiculos-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { RepostajeVehiculosFormComponent } from './repostaje-vehiculos-form/repostaje-vehiculos-form.component';

@Component({
  selector: 'app-repostaje-vehiculos',
  standalone: true,
  imports: [
    RepostajeVehiculosTableComponent,
    RepostajeVehiculosFormComponent,
    HeaderComponent,
  ],
  templateUrl: './repostaje-vehiculos.component.html',
  styleUrl: './repostaje-vehiculos.component.scss',
})
export class RepostajeVehiculosComponent {}
