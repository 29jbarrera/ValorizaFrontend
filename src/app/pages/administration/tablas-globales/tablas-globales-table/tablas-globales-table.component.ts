import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { XGlobalTableDto } from '@valoriza/web-commons';
import { TablaGlobalesService } from '../tabla-globales.service';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
  CommonTable,
  get_icon_boolean,
  ModalFormComponent,
} from '@valoriza/web-components';
import { ProgressBarModule } from 'primeng/progressbar';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tablas-globales-table',
  standalone: true,
  imports: [
    TableModule,
    TagModule,
    IconFieldModule,
    InputTextModule,
    InputIconModule,
    MultiSelectModule,
    DropdownModule,
    HttpClientModule,
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    FormsModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressBarModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
  ],
  templateUrl: './tablas-globales-table.component.html',
  styleUrl: './tablas-globales-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TablasGlobalesTableComponent
  extends CommonTable<XGlobalTableDto>
  implements OnInit
{
  constructor(
    private TablaGlobalesService: TablaGlobalesService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
  }
  ngOnInit() {}

  override async get_values(page: number = 1, pageSize: number = 100) {
    return this.TablaGlobalesService.getGlobales(page, pageSize);
  }

  async edit(global: XGlobalTableDto) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', global);

    // Crear formulario
    const fields = {}; //get_field_create_or_edit_form();

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

  async delete(global: XGlobalTableDto) {
    try {
      await this.TablaGlobalesService.deleteGlobales(global.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== global.id);
      this.totalRecords = this.totalRecords - 1;
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(global: XGlobalTableDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de tablas globales',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(global);
      },
      reject: () => {
        this.messageService.add({
          severity: 'info',
          summary: 'Cancelado',
          detail: 'La acción fue cancelada',
          life: 3000,
        });
      },
    });
  }

  get_icon_session(value: boolean): string {
    return get_icon_boolean(value);
  }

  async open_modal_to_create() {
    // TODO: buscar información para cargar en selectores

    // Crear formulario
    const fields = {}; //get_field_create_or_edit_form();

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
}
