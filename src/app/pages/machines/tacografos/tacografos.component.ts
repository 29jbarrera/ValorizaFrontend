import { Component } from '@angular/core';
import { TacografosFormComponent } from './tacografos-form/tacografos-form.component';
import { TacografosTableComponent } from './tacografos-table/tacografos-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-tacografos',
  standalone: true,
  imports: [TacografosFormComponent, TacografosTableComponent, HeaderComponent],
  templateUrl: './tacografos.component.html',
  styleUrl: './tacografos.component.scss',
})
export class TacografosComponent {}
