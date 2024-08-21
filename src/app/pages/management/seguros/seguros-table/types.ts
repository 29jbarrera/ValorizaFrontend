import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_edit_form(estadosSeguro: any[], tiposSeguros: any[]) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'aseguradora',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Aseguradora',
            placeholder: 'Aseguradora...',
            required: true,
          },
        },
        {
          key: 'codEstadoSeguro',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Estado',
            placeholder: 'Estado...',
            required: true,
            options: estadosSeguro,
            filter: true,
          },
        },
        {
          key: 'codTipoSeguro',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Tipo',
            placeholder: 'Tipo...',
            required: true,
            options: tiposSeguros,
            filter: true,
          },
        },
        {
          key: 'codigo',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nº Póliza',
            placeholder: 'Nº Póliza...',
            required: true,
          },
        },
        {
          key: 'fechaInicio',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha inicio',
            placeholder: 'Fecha inicio...',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'fechaFin',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha fin',
            placeholder: 'Fecha fin...',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'importe',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Importe',
            placeholder: 'Importe...',
            required: true,
          },
        },
        {
          key: 'codMoneda',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Divisa',
            placeholder: 'Divisa...',
            required: true,
          },
        },
        {
          key: 'comentario',
          type: 'textarea',
          className: classNameS,
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
