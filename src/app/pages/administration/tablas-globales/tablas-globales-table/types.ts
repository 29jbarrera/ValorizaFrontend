import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function edit_tablas_globales(arr: any[]) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'codigo',
          type: 'input',
          className,
          props: {
            label: 'TipoDatoTexto',
            placeholder: 'TipoDatoTexto',
            required: true,
            type: 'text',
            disabled: true,
          },
        },
        {
          key: 'valor',
          type: 'select',
          className: classNameS,
          props: {
            label: 'SeleccionUnica',
            placeholder: 'SeleccionUnica',
            required: true,
            options: [
              ...arr.map((o) => {
                return {
                  value: o.value,
                  label: o.label,
                };
              }),
              { value: '', label: 'No especificado', disabled: true },
            ],
          },
        },
      ],
    },
  ];

  return fields;
}
