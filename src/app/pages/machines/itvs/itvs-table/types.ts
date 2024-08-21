import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
  SelectorType,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_search_table_itvs(
  centros: SelectorType[],
  familias: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'centro',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Centro',
            placeholder: 'Selecciona Centro...',
            required: false,
            options: centros,
          },
        },
        {
          key: 'familia',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Familia',
            placeholder: 'Selecciona Familia...',
            required: false,
            options: familias,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'matricula',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Maquinaria',
            placeholder: 'Maquinaria...',
            required: false,
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'fechafrom',
          type: 'input',
          className: `${className} xl:col-6`,
          props: {
            label: 'Fecha desde',
            placeholder: 'Fecha desde...',
            required: false,
            type: 'date',
          },
        },
        {
          key: 'fechato',
          type: 'input',
          className: `${className} xl:col-6`,
          props: {
            label: 'Fecha hasta',
            placeholder: 'Fecha hasta...',
            required: false,
            type: 'date',
          },
        },
      ],
    },
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'comentarios',
          type: 'textarea',
          className: `${className}`,
          props: {
            label: 'Comentario',
            placeholder: 'Comentario...',
            required: false,
          },
        },
      ],
    },
  ];
  return fields;
}
