import { Component, Input, OnInit } from '@angular/core';
import { TableMecanicosComponent } from './table-mecanicos/table-mecanicos.component';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyFieldConfig, FormlyFormOptions, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { get_field_edit_form_averia_trabajo } from './types';

@Component({
  selector: 'app-mecanicos',
  templateUrl: './mecanicos.component.html',
  styleUrls: ['./mecanicos.component.scss'],
  standalone: true,
  imports: [
    TableMecanicosComponent,
    FormsModule,
    ReactiveFormsModule,
    FormlyModule,
    FormlyPrimeNGModule,
  ],
})
export class MecanicosComponent implements OnInit {

  @Input() mecanicos: any[] = [];

  form = new FormGroup<any>({});
  fields: FormlyFieldConfig[] = get_field_edit_form_averia_trabajo();

  model: any = {
    descripcionAveria: '',
    trabajoRealizado: '',
  };

  options: FormlyFormOptions = {};

  constructor() {}

  ngOnInit() {}
}
