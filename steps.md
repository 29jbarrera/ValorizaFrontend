# Codigo de ejemplo para crear formularios

## Importaciones

```typescript
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ModalController } from '@ionic/angular';
import { ModalFormComponent } from '@valoriza/web-components';
import * as XLSX from 'xlsx';
import { DateTime} from 'luxon'

// Imports del componente
FormlyModule,
FormlyPrimeNGModule,
IonicModule,

// Constructor
public modalController: ModalController,

```

## Crear/Inserta fila

```typescript
async open_modal_to_create() {
    // TODO: buscar información para cargar en selectores

    // Crear formulario
    const fields = get_field_create_or_edit_form();

    // Setear el modelo
    const model: any = {};

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create') {
      return;
    }

    try {

      // TODO: Usar el servicio para crear

      // TODO: Actualizar la tabla

      // Mostrar mensaje de éxito
      this.messageService.add({
        severity: 'success',
        summary: 'Creado',
        detail: 'Fila creada correctamente',
        life: 3000,
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }

    // TODO: Usar el servicio para crear
}
```

## Editar

### Ejemplo types.ts

Este ejemplo tite por defecto un input y un selector

```typescript
import { FormlyFieldConfig } from "@ngx-formly/core";
import { className, classNameS, fieldGroupClassName } from "@valoriza/web-components";

export function edit_tablas_globales(arr: any[]) {
  const fields: FormlyFieldConfig[] = [
    {
      fieldGroupClassName,
      fieldGroup: [
        {
          key: "codigo",
          type: "input",
          className,
          props: {
            label: "TipoDatoTexto",
            placeholder: "TipoDatoTexto",
            required: true,
            type: "text",
            disabled: true,
          },
        },
        {
          key: "valor",
          type: "select",
          className: classNameS,
          props: {
            label: "SeleccionUnica",
            placeholder: "SeleccionUnica",
            required: true,
            options: [
              ...arr.map((o) => {
                return {
                  value: o.value,
                  label: o.label,
                };
              }),
              { value: "", label: "No especificado", disabled: true },
            ],
          },
        },
      ],
    },
  ];

  return fields;
}
```

### Método edición

```typescript
async edit(o: any) {
  // TODO: PETICIÓN A BACKEND PARA EDITAR
  console.error('Edit object:', o);

  // Crear formulario
  const fields = get_field_create_or_edit_form();

  // TODO: Setear el modelo y tipar
  const model: any = {
      // id: o.id
  };

  const modal = await this.modalController.create({
    component: ModalFormComponent,
    componentProps: {
      fields,
      model,
      title: 'Editar',
      role: 'edit',
      submit_text: 'Editar',
    },
  });
  await modal.present();

  const { data, role } = await modal.onWillDismiss();
  if (role !== 'edit') {
    return;
  }

  try {

    // TODO: Usar el servicio para editar

    // TODO: Actualizar la tabla

    this.messageService.add({
      severity: 'success',
      summary: 'Actualizado',
      detail: 'Fila actualizada correctamente',
      life: 3000,
    });
  } catch (error) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Algo inesperado ocurrió',
      life: 3000,
    });
  }
}
```
