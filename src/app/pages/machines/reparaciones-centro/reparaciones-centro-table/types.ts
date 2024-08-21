import { FormlyFieldConfig } from '@ngx-formly/core';
import { classNameS, fieldGroupClassName } from '@valoriza/web-components';

export function get_field_edit_form() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'centro.codigo',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Código del Centro',
            placeholder: 'Introducir código...',
            required: true,
          },
        },
        {
          key: 'centro.nombre',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nombre del Centro',
            placeholder: 'Introducir nombre...',
            required: true,
          },
        },
        {
          key: 'centro.grupoCentro.nombre',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Delegación del Centro',
            placeholder: 'Introducir delegación...',
            required: true,
          },
        },
        {
          key: 'otros',
          type: 'number',
          className: classNameS,
          props: {
            label: 'Coste',
            placeholder: 'Introducir coste...',
            required: true,
          },
        },
      ],
    },
  ];

  return fields;
}
