import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  CenterDto,
  CentrosCosteDto,
  ParteTrabajoDto,
} from '@valoriza/web-commons';
import {
  className,
  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_create_or_edit_form(
  partes: ParteTrabajoDto[],
  delegations: CenterDto[],
  centers: CentrosCosteDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idMaquinaria',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Matrícula',
            placeholder: 'Matrícula...',
            required: true,
          },
        },
        {
          key: 'centro',
          type: 'select',
          className: classNameS,
          props: {
            label: 'Nombre del centro',
            placeholder: 'Nombre del centro...',
            required: true,
            options: centers.map((center) => ({
              label: center.nombre,
              value: center.id,
            })),
          },
        },
        // {
        //   key: 'centro.grupoCentro.nombre',
        //   type: 'select',
        //   className: classNameS,
        //   props: {
        //     label: 'Delegación',
        //     placeholder: 'Seleccione una delegación...',
        //     required: true,
        //     options: delegations.map((delegation) => ({
        //       label: delegation.nombre,
        //       value: delegation.id,
        //     })),
        //   },
        // },
        // {
        //   key: 'maquinaria.matricula ',
        //   type: 'input',
        //   className: classNameS,
        //   props: {
        //     label: 'Matrícula',
        //     placeholder: 'Matrícula...',
        //     required: true,
        //   },
        // },
        {
          key: 'codTipoMantenimiento',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Tipo de mantenimiento',
            placeholder: 'Tipo de mantenimiento...',
            required: true,
          },
        },
        {
          key: 'codTipoActuacion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Tipo de actuación',
            placeholder: 'Tipo de actuación...',
            required: true,
            minLength: 3,
          },
        },
        {
          key: 'nombre',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nombre',
            placeholder: 'Nombre...',
            required: true,
          },
        },
        {
          key: 'codEstado',
          type: 'select',
          className: classNameS,
          props: {
            label: 'Estado',
            placeholder: 'Selecciona un estado...',
            required: true,
            options: [
              { label: 'Abierta', value: 'ABR' },
              { label: 'Cerrada', value: 'CER' },
            ],
          },
        },
        {
          key: 'fecha',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha',
            placeholder: 'Fecha...',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'fechaAveria',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha avería',
            placeholder: 'Fecha avería...',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'nombreConductor',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nombre del conductor',
            placeholder: 'Noimbre del conductor...',
            required: false,
          },
        },
        {
          key: 'fechaFinalizacion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Fecha de finalización',
            placeholder: 'Fecha de finalización...',
            required: true,
            type: 'date',
          },
        },
        {
          key: 'horas',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Horas de la máquina',
            placeholder: 'Horas de la máquina...',
            required: false,
          },
        },
        {
          key: 'kilometros',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Kilometros de la máquina',
            placeholder: 'Kilometros de la máquina...',
            required: false,
          },
        },
        {
          key: 'descripcionAveria',
          type: 'textarea',
          className: classNameS,
          props: {
            label: 'Descripción de la avería',
            placeholder: 'Descripción de la avería...',
            required: false,
            rows: 4,
          },
        },
      ],
    },
  ];

  return fields;
}
