import { FormlyFieldConfig } from '@ngx-formly/core';
import { UnidadesMedidaDto, ValorizaTypeDto } from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_create_or_edit_form(
  combustibles: ValorizaTypeDto[],
  unidades: UnidadesMedidaDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'codTipoCombustible',
          type: 'select',
          className: classNameS,
          props: {
            label: 'Combustible',
            placeholder: 'Combustible',
            required: true,
            options: [
              ...combustibles.map((combustible) => {
                return {
                  value: combustible.codigoCombustible,
                  label: combustible.combustible,
                };
              }),
              { value: '', label: 'No especificado', disabled: true },
            ],
          },
        },
        {
          key: 'idUnidadesMedida',
          type: 'select',
          className,
          props: {
            label: 'Unidad',
            placeholder: 'Unidad',
            required: true,
            options: [
              { value: '', label: 'No especificado', disabled: true },
              ...unidades.map((unidad) => {
                return {
                  value: unidad.id,
                  label: unidad.abreviatura,
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
