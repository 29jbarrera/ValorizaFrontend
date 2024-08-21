import { AbstractControl, ValidationErrors } from '@angular/forms';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TacografoDto } from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
  fieldGroupClassNameGrid,
} from '@valoriza/web-components';

export function get_field_edit_form() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'fecha',
          type: 'input',
          className: classNameS,
          templateOptions: {
            type: 'date',
            label: 'Fecha',
            placeholder: 'mm-dd-yyyy',
            required: true,
          },
          validators: {
            validation: [yearValidator],
          },
          validation: {
            messages: {
              invalidYear: 'El año debe tener cuatro dígitos.',
            },
          },
        },
      ],
    },
  ];
  return fields;
}

export function yearValidator(
  control: AbstractControl
): ValidationErrors | null {
  const value = control.value;

  if (!value) {
    return null;
  }

  const year = new Date(value).getFullYear();

  return year.toString().length === 4 ? null : { invalidYear: true };
}
