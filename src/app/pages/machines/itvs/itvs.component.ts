import { Component } from '@angular/core';
import { ItvsFormComponent } from './itvs-form/itvs-form.component';
import { ItvsTableComponent } from './itvs-table/itvs-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-itvs',
  standalone: true,
  imports: [ItvsFormComponent, ItvsTableComponent, HeaderComponent],
  templateUrl: './itvs.component.html',
  styleUrl: './itvs.component.scss',
})
export class ItvsComponent {}
