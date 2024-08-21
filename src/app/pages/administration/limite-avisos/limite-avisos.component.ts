import { Component } from '@angular/core';
import { LimiteAvisosTableComponent } from './limite-avisos-table/limite-avisos-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-limite-avisos',
  standalone: true,
  imports: [LimiteAvisosTableComponent, HeaderComponent],
  templateUrl: './limite-avisos.component.html',
  styleUrl: './limite-avisos.component.scss'
})
export class LimiteAvisosComponent {

}
