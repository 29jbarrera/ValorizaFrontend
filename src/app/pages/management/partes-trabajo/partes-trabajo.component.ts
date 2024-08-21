import { Component } from '@angular/core';
import { PartesFormComponent } from './partes-form/partes-form.component';
import { PartesTableComponent } from './partes-table/partes-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-partes-trabajo',
  standalone: true,
  imports: [PartesFormComponent, PartesTableComponent, HeaderComponent],
  templateUrl: './partes-trabajo.component.html',
  styleUrl: './partes-trabajo.component.scss',
})
export class PartesTrabajoComponent {}
