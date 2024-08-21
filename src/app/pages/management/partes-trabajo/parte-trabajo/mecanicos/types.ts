import { FormlyFieldConfig } from '@ngx-formly/core';
import {

  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_edit_form_averia_trabajo(

) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'descripcionAveria',
          type: 'textarea',
          className: classNameS,
          props: {
            label: 'Descripción de la avería',
            placeholder: 'Introduce descripción de la avería...',
            required: false,
            rows: 4,
          },
        },
        {
            key: 'trabajoRealizado',
            type: 'textarea',
            className: classNameS,
            props: {
              label: 'Trabajo realizado',
              placeholder: 'Introduce trabajo realizado...',
              required: false,
              rows: 4,
            },
          },
      ],
    },
  ];

  return fields;
}
