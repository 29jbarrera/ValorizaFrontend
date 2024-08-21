import { Component } from '@angular/core';
import { SegurosTableComponent } from './seguros-table/seguros-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { SegurosFormComponent } from './seguros-form/seguros-form.component';

@Component({
  selector: 'app-seguros',
  standalone: true,
  imports: [SegurosTableComponent, HeaderComponent, SegurosFormComponent],
  templateUrl: './seguros.component.html',
  styleUrl: './seguros.component.scss',
})
export class SegurosComponent {}
