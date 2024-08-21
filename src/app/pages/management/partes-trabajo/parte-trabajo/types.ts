import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className as c,
  fieldGroupClassNameGrid,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_field_parte_trabajo() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'matricula',
          type: 'custom-dropdown',
          className: `${className} xl:col-2`,
          props: {
            label: 'Matricula',
            placeholder: 'Matricula...',
            required: false,
            options: [],
          },
        },
        {
          key: 'bastidor',
          type: 'input',
          className: `${className} xl:col-2`,
          props: {
            label: 'Bastidor',
            placeholder: 'Bastidor...',
            required: false,
          },
        },
        {
          key: 'centro',
          type: 'custom-dropdown',
          className: `${className} xl:col-2`,
          props: {
            label: 'Centro',
            placeholder: 'Centro...',
            required: false,
          },
        },
        {
          key: 'NombreDelCentro',
          type: 'input',
          className: `${className} xl:col-2`,
          props: {
            label: 'Nombre del centro',
            placeholder: 'Nombre del centro...',
            required: false,
          },
        },
        {
          key: 'TipoMantenimiento',
          type: 'select',
          className: `${className} xl:col-2`,
          props: {
            label: 'Tipo de mantenimiento',
            placeholder: 'Mantenimiento...',
            required: false,
            options: [],
          },
        },
        {
          key: 'tipoActuacion',
          type: 'select',
          className: `${className} xl:col-2`,
          props: {
            label: 'Tipo actuación',
            placeholder: 'Tipo actuación...',
            required: false,
            options: [],
          },
        },
      ],
    },
    // Fila 2
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'nombre',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            label: 'Nombre',
            placeholder: 'Nombre...',
            required: false,
          },
        },
        {
          key: 'fecha',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            type: 'date',
            label: 'Fecha',
            placeholder: 'Introduce Fecha',
            required: false,
          },
        },
        {
          key: 'fechaAveria',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            type: 'date',
            label: 'Fecha avería',
            placeholder: 'Introduce Fecha',
            required: false,
          },
        },
        {
          key: 'nombreConductor',
          type: 'input',
          className: `${className} xl:col-3`,
          props: {
            label: 'Nombre del conductor',
            placeholder: 'Nombre del conductor...',
            required: false,
          },
        },
      ],
    },
    // Fila 3
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'fechaFinalizacion',
          type: 'input',
          className: `${className} xl:col-4`,
          props: {
            type: 'date',
            label: 'Fecha de finalización',
            placeholder: 'Introduce Fecha',
            required: false,
          },
        },
        {
          key: 'horasMaquina',
          type: 'input',
          className: `${className} xl:col-4`,
          props: {
            type: 'number',
            label: 'Horas de la máquina',
            placeholder: 'Introduce Horas',
            required: false,
          },
        },
        {
          key: 'kmMaquina',
          type: 'input',
          className: `${className} xl:col-4`,
          props: {
            type: 'number',
            label: 'Kilómetros de la máquina',
            placeholder: 'Kilómetros de la máquina...',
            required: false,
          },
        },
      ],
    },
  ];

  return fields;
}
