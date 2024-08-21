import { Component } from '@angular/core';
import { FamiliasSubfamiliasTableComponent } from './familias-subfamilias-table/familias-subfamilias-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-familias-subfamilias',
  standalone: true,
  imports: [FamiliasSubfamiliasTableComponent, HeaderComponent],
  templateUrl: './familias-subfamilias.component.html',
  styleUrl: './familias-subfamilias.component.scss',
})
export class FamiliasSubfamiliasComponent {}
