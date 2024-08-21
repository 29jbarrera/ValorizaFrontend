import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  CentrosCosteDto,
  GruposCentroDto,
  ReferenciaMaterialDto,
} from '@valoriza/web-commons';
import { classNameS, fieldGroupClassName } from '@valoriza/web-components';

export function get_field_create_form_prestamos_stock(
  centros: CentrosCosteDto[],
  centros_origen: GruposCentroDto[],
  referenciaMateriales: ReferenciaMaterialDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idCentroOrigen',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Centros origen',
            placeholder: 'Centros origen',
            required: true,
            options: [
              ...centros_origen.map((centro_origen) => {
                return {
                  value: centro_origen.id,
                  label: centro_origen.nombre,
                };
              }),
            ],
            filter: true,
          },
        },
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
