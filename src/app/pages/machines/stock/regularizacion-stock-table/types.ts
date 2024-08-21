import { FormlyFieldConfig } from '@ngx-formly/core';
import { CentrosCosteDto, ReferenciaMaterialDto } from '@valoriza/web-commons';
import { classNameS, fieldGroupClassName } from '@valoriza/web-components';

export function get_field_create_form_regularizacion_stock(
  centros: CentrosCosteDto[],
  referenciaMateriales: ReferenciaMaterialDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idCentroDestino',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Centros destino',
            placeholder: 'Centros destino',
            required: true,
            options: [
              ...centros.map((centro) => {
                return {
                  value: centro.id,
                  label: centro.nombre,
                };
              }),
            ],
            filter: true,
          },
        },
        {
          key: 'idReferenciaMaterial',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Referencia Material',
            placeholder: 'Referencia del material',
            required: true,
            options: [
              ...referenciaMateriales.map((refMaterial) => {
                return {
                  value: refMaterial.id,
                  label: refMaterial.referencia,
                };
              }),
            ],
            filter: true,
          },
        },
        {
          key: '',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Referencia material',
            placeholder: 'Introduce referencia material',
            type: 'text',
          },
        },
        {
          key: 'codMoneda',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Código de Moneda',
            placeholder: 'Introduce el código de moneda',
            type: 'text',
          },
        },
        {
          key: 'cantidad',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Cantidad',
            placeholder: 'Introduce la cantidad',
            type: 'number',
          },
        },
        {
          key: 'valor',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Valor',
            placeholder: 'Introduce el valor',
            type: 'number',
          },
        },
      ],
    },
  ];
  return fields;
}
