import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function edit_limite_avisos() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'codigo',
          type: 'input',
          className,
          props: {
            label: 'Código',
            placeholder: 'Código',
            required: true,
            type: 'text',
            disabled: true,
          },
        },
        {
          key: 'valor',
          type: 'input',
          className,
          props: {
            label: 'Valor',
            placeholder: 'Valor',
            required: true,
            type: 'number',
          },
        },
        {
          key: 'descripcion',
          type: 'input',
          className,
          props: {
            label: 'Descripción',
            placeholder: 'Descripción',
            required: true,
            type: 'text',
          },
        },
      ],
    },
  ];

  return fields;
}
