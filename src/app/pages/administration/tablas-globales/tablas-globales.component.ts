import { Component } from '@angular/core';
import { TablasGlobalesTableComponent } from './tablas-globales-table/tablas-globales-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-tablas-globales',
  standalone: true,
  imports: [TablasGlobalesTableComponent, HeaderComponent],
  templateUrl: './tablas-globales.component.html',
  styleUrl: './tablas-globales.component.scss'
})
export class TablasGlobalesComponent {

}
