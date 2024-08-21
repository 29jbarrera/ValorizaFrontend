import { FormlyFieldConfig } from '@ngx-formly/core';
import { Gnc, GruaDto } from '@valoriza/web-commons';
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
          key: 'fecha',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha próxima',
            placeholder: 'Fecha próxima...',
            required: true,
            type: 'date',
          },
        },
      ],
    },
  ];

  return fields;
}
