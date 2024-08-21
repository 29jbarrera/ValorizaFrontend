import { Component } from '@angular/core';
import { MaterialesTableComponent } from './materiales-table/materiales-table.component';
import { HeaderComponent } from '@valoriza/web-components';
import { MaterialesFormComponent } from './materiales-form/materiales-form.component';

@Component({
  selector: 'app-materiales',
  standalone: true,
  imports: [MaterialesTableComponent,MaterialesFormComponent , HeaderComponent],
  templateUrl: './materiales.component.html',
  styleUrl: './materiales.component.scss',
})
export class MaterialesComponent {}
