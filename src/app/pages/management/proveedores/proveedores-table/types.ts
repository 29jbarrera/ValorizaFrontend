import { FormlyFieldConfig } from '@ngx-formly/core';
import { ProveedorDto } from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_create_or_edit_proveedores(
  proveedores: ProveedorDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'docIdentificacion',
          type: 'input',
          className,
          props: {
            label: 'Doc. Identificación',
            placeholder: 'Doc. Identificación...',
            required: true,
            type: 'text',
          },
        },
        {
          key: 'nombre',
          type: 'input',
          className,
          props: {
            label: 'Nombre',
            placeholder: 'Nombre...',
            required: true,
            type: 'text',
          },
        },
        {
          key: 'direccion',
          type: 'input',
          className,
          props: {
            label: 'Dirección',
            placeholder: 'Dirección...',
            required: false,
            type: 'text',
          },
        },
        {
          key: 'telefono',
          type: 'input',
          className,
          props: {
            label: 'Teléfono',
            placeholder: 'Teléfono...',
            required: false,
            type: 'string',
          },
        },
        {
          key: 'comentarios',
          type: 'input',
          className,
          props: {
            label: 'Comentarios',
            placeholder: 'Comentarios...',
            required: false,
            type: 'text',
          },
        },
        {
          key: 'sap',
          type: 'input',
          className,
          props: {
            label: 'SAP',
            placeholder: 'SAP...',
            required: false,
            type: 'text',
          },
        },
      ],
    },
  ];

  return fields;
}
