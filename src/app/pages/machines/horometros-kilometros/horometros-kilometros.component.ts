import { Component } from '@angular/core';

import { HorometrosKilometrosFormComponent } from './horometros-kilometros-form/horometros-kilometros-form.component';
import { HorometrosKilometrosTableComponent } from './horometros-kilometros-table/horometros-kilometros-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-horometros-kilometros',
  standalone: true,
  imports: [
    HeaderComponent,
    HorometrosKilometrosFormComponent,
    HorometrosKilometrosTableComponent,
  ],
  templateUrl: './horometros-kilometros.component.html',
  styleUrl: './horometros-kilometros.component.scss',
})
export class HorometrosKilometrosComponent {}
