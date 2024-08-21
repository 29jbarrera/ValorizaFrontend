import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateGruaDto, GruaDto } from '@valoriza/web-commons';
import { GruasService } from '../gruas.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { ModalController } from '@ionic/angular';
import {
  CommonTable,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { FormlyModule } from '@ngx-formly/core';
import { get_field_create_or_edit_form } from './types';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-gruas-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ConfirmDialogModule,
    ButtonModule,
    ToastModule,
    ProgressBarModule,
    ModalFormComponent,
    FormlyPrimeNGModule,
    FormlyModule,
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './gruas-table.component.html',
  styleUrl: './gruas-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class GruasTableComponent
  extends CommonTable<GruaDto>
  implements OnInit
{
  constructor(
    private GruasService: GruasService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override get_values(page = 1, perPage = 100) {
    return this.GruasService.getGruas(page, perPage);
  }

  async edit(grua: GruaDto) {
    const fields = get_field_create_or_edit_form();

    const model: GruaDto = {
      fecha: grua.fecha,
      idMaquinaria: grua.idMaquinaria,
      id: grua.id!,
      idEmpresa: grua.idEmpresa!,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar grua',
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
      await this.GruasService.edit(data);
      await this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Elemento actualizado correctamente',
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

  async delete(grua: GruaDto) {
    try {
      await this.GruasService.deleteGruas(grua.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.totalRecords = this.totalRecords - 1;
      this.value = this.value.filter((o) => o.id !== grua.id);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = error.error?.message;

        if (
          errorMessage ===
          'No podemos eliminar este registro porque tiene registros relacionados'
        ) {
          this._confirmationService.confirm({
            message:
              'No se puede eliminar porque tiene registros relacionados.',
            header: 'Cabecera',
            icon: 'fa fa-exclamation-circle',
            rejectVisible: false,
            acceptButtonStyleClass: 'p-button-primary',
            acceptLabel: 'Aceptar',
            accept: async () => {},
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Algo inesperado ocurrió',
            life: 3000,
          });
        }
      }
      return;
    }
  }

  async open_modal_to_create() {
    const fields = get_field_create_or_edit_form();

    const model: any = {};

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear una grua',
        role: 'create_grua',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create_grua') {
      return;
    }
    await this.create(data);
  }

  private async create(body: CreateGruaDto) {
    try {
      await this.GruasService.create(body);

      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Unidad creada correctamente',
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

  async confirm_delete(grua: GruaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de gruas',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => this.delete(grua),
    });
  }

  get_gruas_familia_descripcion(grua: GruaDto): string {
    return get_lang_description(grua?.maquinaria?.familia?.langs!, LANG_ES);
  }

  get_gruas_subFamilia_descripcion(grua: GruaDto): string {
    return get_lang_description(grua?.maquinaria?.subFamilia?.langs!, LANG_ES);
  }

  export_excel() {
    const data_to_sheet = this.value.map((grua) => {
      return {
        Maquinaria: grua.maquinaria?.matricula,
        Centro: grua.maquinaria?.nombreCentro,
        Delegación: grua.maquinaria?.nombreGrupoCentro,
        Familia: this.get_gruas_familia_descripcion(grua),
        Subfamilia: this.get_gruas_subFamilia_descripcion(grua),
        Fecha_próxima: grua.fecha,
      };
    });
    export_data_to_excel(data_to_sheet, 'Grúas');
  }
}
