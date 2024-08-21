import { FormlyFieldConfig } from '@ngx-formly/core';
import { CentrosCosteDto } from '@valoriza/web-commons';
import {

  classNameS,
  fieldGroupClassName,
} from '@valoriza/web-components';

export function get_field_create_or_edit_form_instalaciones(
  centros: CentrosCosteDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idCentro',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Centros',
            placeholder: 'Centros',
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
          key: 'nombre',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Nombre',
            placeholder: 'Introduce Nombre',
            required: true,
          },
        },
        {
          key: 'comentarios',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Comentarios',
            placeholder: 'Introduce Comentarios',
            required: false,
          },
        },
      ],
    },
  ];

  return fields;
}

export function get_field_create_or_edit_form_elementos() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idInstalacion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'ID',
            disabled: true,
          },
        },
        {
          key: 'descripcion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Comentarios',
            placeholder: 'Introduce Comentarios',
            required: true,
          },
        },
      ],
    },
  ];

  return fields;
}

export function get_field_create_or_edit_form_operaciones() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'idElemento',
          type: 'input',
          className: classNameS,
          props: {
            label: 'ID',
            disabled: true,
          },
        },
        {
          key: 'fecha',
          type: 'input',
          className: classNameS,
          props: {
            type: 'date',
            label: 'Fecha',
            placeholder: 'Introduce Fecha',
            required: true,
          },
        },
        {
          key: 'actuante',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Actuante',
            placeholder: 'Introduce Actuante',
            required: true,
          },
        },
        {
          key: 'frecuencia',
          type: 'input',
          className: classNameS,
          props: {
            type: 'number',
            label: 'Frecuencia',
            placeholder: 'Introduce Frecuencia',
            required: true,
          },
        },
        {
          key: 'descripcion',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Descripcion',
            placeholder: 'Introduce Descripcion',
            required: true,
          },
        },
      ],
    },
  ];

  return fields;
}
