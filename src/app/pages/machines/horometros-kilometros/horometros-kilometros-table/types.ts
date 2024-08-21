import { FormlyFieldConfig } from '@ngx-formly/core';
import { HmKmDto } from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_edit_form() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'horas',
          type: 'number',
          className: classNameS,
          props: {
            label: 'Horas',
            placeholder: 'Introduce horas',
            required: true,
          },
        },
        {
          key: 'kilometros',
          type: 'number',
          className: classNameS,
          props: {
            label: 'Kilometros',
            placeholder: 'Introduce kilometros',
            required: true,
          },
        },
        {
          key: 'fecha',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha',
            placeholder: 'Introduce fecha...',
            required: true,
            type: 'date',
          },
        },
      ],
    },
  ];

  return fields;
}
