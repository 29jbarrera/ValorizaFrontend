import { FormlyFieldConfig } from '@ngx-formly/core';
import { CentrosViewDto } from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

// TODO: falta aclaracion de el proceso de edicion.
export function get_field_edit_form(
  centros: CentrosViewDto[],
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'codTipoCombustible',
          type: 'checkbox',
          className: classNameS,
          props: {
            label: 'Aprovisionar',
            placeholder: 'Aprovisionado',
            required: true,
          },
        },
        {
          key: 'centroId',
          type: 'select',
          className,
          props: {
            label: 'Centro',
            placeholder: 'Centro',
            required: true,
            options: [
              { value: '', label: 'No especificado', disabled: true },
              ...centros.map((centro) => {
                return {
                  value: centro.id,
                  label: centro.nombre,
                };
              }),
            ],
          },
        },
      ],
    },
  ];

  return fields;
}

