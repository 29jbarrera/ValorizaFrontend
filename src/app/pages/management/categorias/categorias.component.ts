import { Component } from '@angular/core';
import { CategoriasTableComponent } from './categorias-table/categorias-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CategoriasTableComponent, HeaderComponent],
  templateUrl: './categorias.component.html',
  styleUrl: './categorias.component.scss'
})
export class CategoriasComponent {

}
