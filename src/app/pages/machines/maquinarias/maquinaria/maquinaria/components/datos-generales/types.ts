import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
  SelectorType,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_datos_generales_maquinaria(
  centros_compras: SelectorType[],
  centros: SelectorType[],
  familias: SelectorType[],
  subfamilias: SelectorType[],
  combustibles: SelectorType[],
  emisiones: SelectorType[],
  servicios: SelectorType[],
  estados_maquinaria: SelectorType[]
) {
  const fields: FormlyFieldConfig[] = [
    //esImplemento
    //operativa
    //avisoTracking
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'esImplemento',
          type: 'checkbox',
          className: `${className}`,
          props: {
            label: 'Es Implemento',
          },
        },
        {
          key: 'operativa',
          type: 'checkbox',
          className: `${className}`,
          props: {
            label: 'Operatividad',
          },
        },
        {
          key: 'avisoTracking',
          type: 'checkbox',
          className: `${className}`,
          props: {
            label: 'Aviso Tracking',
          },
        },
      ],
    },

    // Matricula  Nº Bastidor y Fecha matriculación
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'matricula',
          type: 'input',
          className: `${className} xl:col-2`,
          props: {
            label: 'Matricula',
            placeholder: 'Matricula...',
            required: true,
          },
        },
        {
          key: 'bastidor',
          type: 'input',
          className: `${className} xl:col-8`,
          props: {
            label: 'Bastidor',
            placeholder: 'Bastidor...',
            required: true,
          },
        },
        {
          key: 'fechaMatriculacion',
          type: 'input',
          className: `${className} xl:col-2`,
          props: {
            type: 'date',
            label: 'Fecha Matriculación',
            placeholder: 'Fecha Matriculación...',
            required: true,
          },
        },
      ],
    },
    // Centro de compra
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'idCentroCompra',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Centro de Compra',
            placeholder: 'Selecciona Centro de Compra',
            required: true,
            options: [
              ...centros_compras.map((centro_compra) => {
                return {
                  value: centro_compra.value,
                  label: centro_compra.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // Centro
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'idCentro',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Centro',
            placeholder: 'Selecciona Centro',
            required: true,
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
      ],
    },
    // Familia y Subfamilia
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'idFamilia',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Familia',
            placeholder: 'Selecciona Familia',
            required: true,
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
        {
          key: 'idSubFamilia',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Subfamilia',
            placeholder: 'Selecciona Subfamilia',
            required: true,
            options: [
              ...subfamilias.map((subfamilia) => {
                return {
                  value: subfamilia.value,
                  label: subfamilia.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // Tipo Combustible y Nivel de emisiones
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'codTipoCombustible',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Tipo Combustible',
            placeholder: 'Selecciona Tipo Combustible',
            required: true,
            options: [
              ...combustibles.map((combustible) => {
                return {
                  value: combustible.value,
                  label: combustible.label,
                };
              }),
            ],
          },
        },
        {
          key: 'codNivelEmisiones',
          type: 'custom-dropdown',
          className: `${className} xl:col-6`,
          props: {
            label: 'Nivel de emisiones',
            placeholder: 'Selecciona Nivel de Emisiones',
            required: true,
            options: [
              ...emisiones.map((emision) => {
                return {
                  value: emision.value,
                  label: emision.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // Servicio, Estado Maquinaria y Conductor
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'servicio',
          type: 'custom-dropdown',
          className: `${className} xl:col-3`,
          props: {
            label: 'Servicio',
            placeholder: 'Selecciona Servicio',
            required: true,
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
        {
          key: 'codEstadoMaquinaria',
          type: 'custom-dropdown',
          className: `${className} xl:col-3`,
          props: {
            label: 'Estado Maquinaria',
            placeholder: 'Selecciona Estado Maquinaria',
            required: true,
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
        {
          key: 'conductor',
          type: 'input',
          className: `${className} xl:col-6`,
          props: {
            label: 'Conductor',
            placeholder: 'Conductor...',
            required: false,
          },
        },
      ],
    },
  ];

  return fields;
}
