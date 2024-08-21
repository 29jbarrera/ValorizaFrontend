import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
  SelectorType,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_search_table_maquinaria(
  servicios: SelectorType[],
  centros: SelectorType[],
  seguros: SelectorType[],
  estados_maquinaria: SelectorType[],
  familias: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    //TODO: Checkboxes (Operativa, Es Implemento y Aviso Tracking)
    // Matricula  Nº Bastidor y Servicio
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'matricula',
          type: 'input',
          className: `${className} xl:col-4`,
          props: {
            label: 'Matricula',
            placeholder: 'Matricula...',
            required: false,
          },
        },
        {
          key: 'bastidor',
          type: 'input',
          className: `${className} xl:col-4`,
          props: {
            label: 'Bastidor',
            placeholder: 'Bastidor...',
            required: false,
          },
        },
        {
          key: 'servicio',
          type: 'custom-dropdown',
          className: `${className} xl:col-4`,
          props: {
            label: 'Servicio',
            placeholder: 'Selecciona Servicio',
            required: false,
            options: [
              ...servicios.map((servicio) => {
                return {
                  value: servicio.value,
                  label: servicio.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // Centros, Seguro, Estado Maquinaria
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'idCentro',
          type: 'custom-dropdown',
          className: `${className} xl:col-4`,
          props: {
            label: 'Centro',
            placeholder: 'Selecciona Centro',
            required: false,
            options: [
              ...centros.map((centro) => {
                return {
                  value: centro.value,
                  label: centro.label,
                };
              }),
            ],
          },
        },
        {
          key: 'idSeguro',
          type: 'custom-dropdown',
          className: `${className} xl:col-4`,
          props: {
            label: 'Centro',
            placeholder: 'Selecciona Centro',
            required: false,
            options: [
              ...seguros.map((seguro) => {
                return {
                  value: seguro.value,
                  label: seguro.label,
                };
              }),
            ],
          },
        },
        {
          key: 'codEstadoMaquinaria',
          type: 'custom-dropdown',
          className: `${className} xl:col-4`,
          props: {
            label: 'Estado Maquinaria',
            placeholder: 'Selecciona Estado Maquinaria',
            required: false,
            options: [
              ...estados_maquinaria.map((estado) => {
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
    // Familia
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'idFamilia',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Familia',
            placeholder: 'Selecciona Familia',
            required: false,
            options: [
              ...familias.map((familia) => {
                return {
                  value: familia.value,
                  label: familia.label,
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
