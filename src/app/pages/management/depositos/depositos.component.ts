import { Component } from '@angular/core';
import { DepositosTableComponent } from './depositos-table/depositos-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { DepositosFormComponent } from './depositos-form/depositos-form.component';

@Component({
  selector: 'app-depositos',
  standalone: true,
  imports: [DepositosTableComponent, DepositosFormComponent, HeaderComponent],
  templateUrl: './depositos.component.html',
  styleUrl: './depositos.component.scss',
})
export class DepositosComponent {}
