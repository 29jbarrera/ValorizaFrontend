import { Component } from '@angular/core';

import { GastosFormComponent } from './gastos-form/gastos-form.component';
import { GastosTableComponent } from './gastos-table/gastos-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-gastos',
  standalone: true,
  imports: [GastosFormComponent, GastosTableComponent, HeaderComponent],
  templateUrl: './gastos.component.html',
  styleUrl: './gastos.component.scss',
})
export class GastosComponent {}
