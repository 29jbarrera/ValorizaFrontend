import { Component } from '@angular/core';
import { ReparacionesFormComponent } from './reparaciones-form/reparaciones-form.component';
import { ReparacionesTableComponent } from './reparaciones-table/reparaciones-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-reparaciones',
  standalone: true,
  imports: [
    ReparacionesFormComponent,
    ReparacionesTableComponent,
    HeaderComponent,
  ],
  templateUrl: './reparaciones.component.html',
  styleUrl: './reparaciones.component.scss',
})
export class ReparacionesComponent {}
