import { Component } from '@angular/core';
import { MarcasTableComponent } from './marcas-table/marcas-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-marcas',
  standalone: true,
  imports: [MarcasTableComponent, HeaderComponent],
  templateUrl: './marcas.component.html',
  styleUrl: './marcas.component.scss',
})
export class MarcasComponent {}
