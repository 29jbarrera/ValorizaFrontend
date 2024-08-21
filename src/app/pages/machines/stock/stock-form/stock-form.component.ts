import { Component } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';

const fieldGroupClassName = 'flex flex-row flex-wrap column-gap-3 py-2';
const className =
  'flex-1  app-kom-custom-form-colum app-kom-custom-form-colum-w-full-input';
@Component({
  selector: 'app-stock-form',
  standalone: true,
  imports: [
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    InputMaskModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule
  ],
  templateUrl: './stock-form.component.html',
  styleUrl: './stock-form.component.scss',
})
export class StockFormComponent {
  form = new FormGroup({});
  model = { email: 'email@gmail.com' };
  options: FormlyFormOptions = {};

  fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'centerCode',
          type: 'input',
          className,
          props: {
            label: 'Codigo centro',
            placeholder: '',
          },
        },
        {
          key: 'centerName',
          type: 'input',
          className,

          props: {
            label: 'Nombre centro',
            placeholder: '',
          },
        },
      ],
    },
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'refName',
          type: 'input',
          className,
          props: {
            label: 'Nombre referencial material',
            placeholder: '',
          },
        },
        {
          key: 'description',
          type: 'input',
          className,
          props: {
            label: 'Descripcion referencia material',
            placeholder: '',
          },
        },
        {
          key: 'amount',
          type: 'input',
          className,
          props: {
            label: 'Importe',
            placeholder: '',
          },
        },
      ],
    },
  ];
}
