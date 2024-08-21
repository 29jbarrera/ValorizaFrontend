import { Component } from '@angular/core';
import { TasasCentroFormComponent } from './tasas-centro-form/tasas-centro-form.component';
import { TasasCentroTableComponent } from './tasas-centro-table/tasas-centro-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-tasas-centros',
  standalone: true,
  imports: [
    TasasCentroFormComponent,
    TasasCentroTableComponent,
    HeaderComponent,
  ],
  templateUrl: './tasas-centros.component.html',
  styleUrl: './tasas-centros.component.scss',
})
export class TasasCentrosComponent {}
