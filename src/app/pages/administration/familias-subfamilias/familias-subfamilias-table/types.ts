import { FormlyFieldConfig } from '@ngx-formly/core';
import {
  _classNameCheckbox,
  classNameS,
  fieldGroupClassNameGrid,
  Selection,
} from '@valoriza/web-components';

const className =
  'app-kom-custom-form-styles app-kom-custom-form-colum-grow col-12';

export function get_fields_edit_or_create_form_familia() {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName: `${fieldGroupClassNameGrid} mt-3`,
      fieldGroup: [
        {
          key: 'descripcion',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Descripción',
            placeholder: 'Descripción...',
            required: true,
          },
        },
      ],
    },
  ];

  return fields;
}


export function get_fields_create_form_subfamilia(
  niveles_mantenimiento: Selection[],
) {
  const fields: FormlyFieldConfig[] = [
    // Selectores M.C. , M.E. y M.I.
    {
      fieldGroupClassName: `${fieldGroupClassNameGrid} mb-1`,
      fieldGroup: [
        {
          key: 'idNivelMantenimientoChasis',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Chasis',
            placeholder: 'Selecciona Nivel Mantenimiento Chasis...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
        {
          key: 'idNivelMantenimientoEquipo',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Equipo',
            placeholder: 'Selecciona Nivel Mantenimiento Equipo...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
        {
          key: 'idNivelMantenimientoImplemento',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Implemento',
            placeholder: 'Selecciona Nivel Mantenimiento Implemento...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // Descripción
    {
      fieldGroupClassName: `${fieldGroupClassNameGrid}`,
      fieldGroup: [
        {
          key: 'descripcion',
          type: 'input',
          className: `${className}`,
          props: {
            label: 'Descripción',
            placeholder: 'Descripción...',
            required: true,
          },
        },
      ],
    },
    // grua, fichaTecnica y  inspeccionTecnica
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'grua',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Grua',
          },
        },
        {
          key: 'fichaTecnica',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Ficha Técnica',
          },
        },
        {
          key: 'inspeccionTecnica',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Inspección Técnica',
          },
        },
      ],
    },
    // permisoCirculacion, seguro, tarjetaTransporte
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'permisoCirculacion',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Permiso Circulación',
          },
        },
        {
          key: 'seguro',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Seguro',
          },
        },
        {
          key: 'tarjetaTransporte',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Tarjeta Transporte',
          },
        },
      ],
    },
    // tacografo, marcadoCe y peso
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'tacografo',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Tacógrafo',
          },
        },
        {
          key: 'marcadoCe',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Marcado CE',
          },
        },
        {
          key: 'peso',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Peso',
          },
        },
      ],
    },
    // gnc, esImplemento
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'gnc',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'GNC',
          },
        },
        {
          key: 'esImplemento',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Es Implemento',
          },
        },
      ],
    },
  ];

  return fields;
}


export function get_fields_edit_form_subfamilia(
  niveles_mantenimiento: Selection[],
) {
  const fields: FormlyFieldConfig[] = [
    // Selectores M.C. , M.E. y M.I.
    {
      fieldGroupClassName: `${fieldGroupClassNameGrid} mb-1`,
      fieldGroup: [
        {
          key: 'idNivelMantenimientoChasis',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Chasis',
            placeholder: 'Selecciona Nivel Mantenimiento Chasis...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
        {
          key: 'idNivelMantenimientoEquipo',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Equipo',
            placeholder: 'Selecciona Nivel Mantenimiento Equipo...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
        {
          key: 'idNivelMantenimientoImplemento',
          type: 'custom-dropdown',
          className: `${className}`,
          props: {
            label: 'Nivel Mantenimiento Implemento',
            placeholder: 'Selecciona Nivel Mantenimiento Implemento...',
            options: [
              ...niveles_mantenimiento.map((nivel) => {
                return {
                  value: nivel.value,
                  label: nivel.label,
                };
              }),
            ],
          },
        },
      ],
    },
    // grua, fichaTecnica y  inspeccionTecnica
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'grua',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Grua',
          },
        },
        {
          key: 'fichaTecnica',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Ficha Técnica',
          },
        },
        {
          key: 'inspeccionTecnica',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Inspección Técnica',
          },
        },
      ],
    },
    // permisoCirculacion, seguro, tarjetaTransporte
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'permisoCirculacion',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Permiso Circulación',
          },
        },
        {
          key: 'seguro',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Seguro',
          },
        },
        {
          key: 'tarjetaTransporte',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Tarjeta Transporte',
          },
        },
      ],
    },
    // tacografo, marcadoCe y peso
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'tacografo',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Tacógrafo',
          },
        },
        {
          key: 'marcadoCe',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Marcado CE',
          },
        },
        {
          key: 'peso',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Peso',
          },
        },
      ],
    },
    // gnc, esImplemento
    {
      fieldGroupClassName: fieldGroupClassNameGrid,
      fieldGroup: [
        {
          key: 'gnc',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'GNC',
          },
        },
        {
          key: 'esImplemento',
          type: 'checkbox',
          className: `${_classNameCheckbox}`,
          props: {
            label: 'Es Implemento',
          },
        },
      ],
    },
  ];

  return fields;
}
