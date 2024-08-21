import { Component } from '@angular/core';

import { InstalacionesFormComponent } from './instalaciones-form/instalaciones-form.component';
import { InstalacionesTableComponent } from './instalaciones-table/instalaciones-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-instalaciones',
  standalone: true,
  imports: [
    InstalacionesFormComponent,
    InstalacionesTableComponent,
    HeaderComponent,
  ],
  templateUrl: './instalaciones.component.html',
  styleUrl: './instalaciones.component.scss',
})
export class InstalacionesComponent {}
