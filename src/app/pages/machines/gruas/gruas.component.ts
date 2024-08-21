import { Component } from '@angular/core';

import { GruasFormComponent } from './gruas-form/gruas-form.component';
import { GruasTableComponent } from './gruas-table/gruas-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-gruas',
  standalone: true,
  imports: [GruasFormComponent, GruasTableComponent, HeaderComponent],
  templateUrl: './gruas.component.html',
  styleUrl: './gruas.component.scss',
})
export class GruasComponent {}
