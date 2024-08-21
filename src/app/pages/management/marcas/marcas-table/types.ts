import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_create_or_edit_form() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'descripcion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nombre',
            placeholder: 'Introduce Nombre',
            required: true,
          },
        },
      ],
    },
  ];

  return fields;
}
