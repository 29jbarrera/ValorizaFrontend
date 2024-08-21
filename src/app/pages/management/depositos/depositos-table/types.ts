import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
  SelectorType,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_search_table_depositos(centros: SelectorType[]) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'comun',
          type: 'checkbox',
          className: `${className}`,
          props: {
            label: 'Común',
            required: false,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'nombre',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Centro',
            placeholder: 'Selecciona Centro',
            required: false,
            options: centros,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'descripcion',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Descripción',
            placeholder: 'Descripción...',
            required: false,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'capacidad',
          type: 'number',
          className: `${className}`,
          props: {
            label: 'Capacidad',
            placeholder: 'Capacidad...',
            required: false,
          },
        },
      ],
    },
  ];
  return fields;
}
