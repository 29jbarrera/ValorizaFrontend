import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  _className as className,
  fieldGroupClassNameGrid,
  SelectorType,
} from '@valoriza/web-components';

export function get_fields_seguros_e_impuestos(
  tipos_seguros: SelectorType[],
  estados_seguros: SelectorType[],
  codigos_monedas: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    // numeroPoliza y aseguradora
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'codigo',
          type: 'input',
          className: `${className} xl:col-6`,
          props: {
            label: 'Poliza Nº',
            placeholder: 'Poliza Nº...',
            required: false,
          },
        },
        {
          key: 'aseguradora',
          type: 'input',
          className: `${className} xl:col-6`,
          props: {
            label: 'Aseguradora',
            placeholder: 'Aseguradora...',
            required: false,
          },
        },
      ],
    },
    // tipoSeguro y estadoSeguro
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'tipoSeguro',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Tipo Seguro',
            placeholder: 'Selecciona Tipo Seguro',
            required: true,
            options: [
              ...tipos_seguros.map((tipo) => {
                return {
                  value: tipo.value,
                  label: tipo.label,
                };
              }),
            ],
          },
        },
        {
          key: 'estadoSeguro',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Estado Seguro',
            placeholder: 'Selecciona Estado Seguro',
            required: true,
            options: [
              ...estados_seguros.map((estado) => {
                return {
                  value: estado.value,
                  label: estado.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // fechaInicio, fechaFin, importe, codMonedaImporte, documento
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'fechaInicio',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            label: 'Fecha Inicio',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'fechaFin',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            label: 'Fecha Fin',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'importe',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            label: 'Importe',
            placeholder: 'Importe...',
            required: true,
            type: 'number',
          },
        },
        {
            key: 'codMoneda',
            type: 'custom-dropdown',
            className: `${className} xl:col-3`,
            props: {
              label: 'Divisa',
              placeholder: 'Divisa...',
              required: true,
              options: [
                ...codigos_monedas.map((codigo) => {
                  return {
                    value: codigo.value,
                    label: codigo.label,
                  };
                }),
                { label: "EUR", value: "EUR"}
              ],
            },
          },
      ],
    },
    // anyoImpuesto, importeImpuesto, codMonedaImpuesto ¿¿??
    {
        fieldGroupClassName: fieldGroupClassNameGrid,
        fieldGroup: [
          {
            key: 'anyoImpuesto',
            type: 'input',
            className: `${className} xl:col-3`,
            props: {
              label: 'Año Impuesto',
              required: true,
              type: 'date',
            },
          },
          {
            key: 'importeImpuesto',
            type: 'input',
            className: `${className} xl:col-3`,
            props: {
              label: 'Impuesto',
              placeholder: 'Impuesto...',
              required: true,
              type: 'number',
            },
          },
          {
              key: 'codMonedaImpuesto',
              type: 'custom-dropdown',
              className: `${className} xl:col-3`,
              props: {
                label: 'Divisa',
                placeholder: 'Divisa...',
                required: true,
                options: [
                  ...codigos_monedas.map((codigo) => {
                    return {
                      value: codigo.value,
                      label: codigo.label,
                    };
                  }),
                  { label: "EUR", value: "EUR"}
                ],
              },
            },
        ],
      },
  ];

  return fields;
}
