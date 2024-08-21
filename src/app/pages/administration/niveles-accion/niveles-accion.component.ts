import { Component } from '@angular/core';
import { NivelesAccionTableComponent } from './niveles-accion-table/niveles-accion-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { NivelesAccionFormComponent } from './niveles-accion-form/niveles-accion-form.component';

@Component({
  selector: 'app-niveles-accion',
  standalone: true,
  imports: [
    NivelesAccionTableComponent,
    HeaderComponent,
    NivelesAccionFormComponent,
  ],
  templateUrl: './niveles-accion.component.html',
  styleUrl: './niveles-accion.component.scss',
})
export class NivelesAccionComponent {}
