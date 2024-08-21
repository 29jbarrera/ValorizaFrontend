import { Component } from '@angular/core';
import { ImpuestosTableComponent } from './impuestos-table/impuestos-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { ImpuestosFormComponent } from './impuestos-form/impuestos-form.component';


@Component({
  selector: 'app-impuestos',
  standalone: true,
  imports: [ImpuestosTableComponent, HeaderComponent, ImpuestosFormComponent],
  templateUrl: './impuestos.component.html',
  styleUrl: './impuestos.component.scss'
})
export class ImpuestosComponent {

}
