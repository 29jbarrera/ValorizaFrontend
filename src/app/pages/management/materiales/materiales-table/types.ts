import { FormlyFieldConfig } from '@ngx-formly/core';
import { CategoriaDto } from '@valoriza/web-commons';
import {
  classNameS,
  fieldGroupClassName,
  get_lang_description,
  LANG_ES,
} from '@valoriza/web-components';

export function get_field_create_or_edit_form_materiales(
  categories: CategoriaDto[]
) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: 'referencia',
          type: 'input',
          className: classNameS,
          props: {
            label: 'Referencia',
            placeholder: 'Introduce Referencia',
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
            required: false,
          },
        },
        {
          key: 'codigoCategoria',
          type: 'custom-dropdown',
          className: classNameS,
          props: {
            label: 'Categoría',
            placeholder: 'Selecciona Categoría',
            required: true,
            options: [
              ...categories.map((category) => {
                return {
                  value: category.codigo,
                  label: get_description_category_material(category),
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

function get_description_category_material(category: CategoriaDto): string {
  return get_lang_description(category.langs!, LANG_ES);
}
