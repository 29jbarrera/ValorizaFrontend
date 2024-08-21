import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
  SelectorType,
  fieldGroupClassName,
  classNameS,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_search_table_niveles_mantenimiento(
  grupos: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'accion',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Acción',
            placeholder: 'Acción...',
            required: false,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'grupo',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Grupos',
            placeholder: 'Grupos...',
            required: false,
            options: grupos,
          },
        },
      ],
    },
  ];
  return fields;
}

export function get_field_create_or_edit_form_niveles_accion(
  grupos: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'accion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Acción',
            placeholder: 'Acción... ',
            required: true,
          },
        },
        {
          key: 'grupo',
          type: 'custom-dropdown',
          className: className,
          props: {
            label: 'Grupos',
            placeholder: 'Selecciona Grupo...',
            required: true,
            options: grupos,
            filter: true,
          },
        },
      ],
    },
  ];
  return fields;
}
