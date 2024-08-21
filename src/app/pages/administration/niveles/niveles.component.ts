import { Component } from '@angular/core';
import { NivelesTableComponent } from './niveles-table/niveles-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-niveles',
  standalone: true,
  imports: [NivelesTableComponent, HeaderComponent],
  templateUrl: './niveles.component.html',
  styleUrl: './niveles.component.scss'
})
export class NivelesComponent {

}
