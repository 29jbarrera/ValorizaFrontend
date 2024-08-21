import { Component } from '@angular/core';

import { GncFormComponent } from './gnc-form/gnc-form.component';
import { GncTableComponent } from './gnc-table/gnc-table.component';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-gnc',
  standalone: true,
  imports: [GncFormComponent, GncTableComponent, HeaderComponent],
  templateUrl: './gnc.component.html',
  styleUrl: './gnc.component.scss',
})
export class GncComponent {}
