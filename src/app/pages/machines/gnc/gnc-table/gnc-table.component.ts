import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GncDto } from '@valoriza/web-commons';
import { GncService } from '../gnc.service';

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
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import {
  CommonTable,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { get_field_edit_form } from './types';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-gnc-table',
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
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './gnc-table.component.html',
  styleUrl: './gnc-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class GncTableComponent extends CommonTable<GncDto> implements OnInit {
  constructor(
    private GncService: GncService,
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
    return this.GncService.getGnc(page, perPage);
  }

  async edit(gnc: GncDto) {
    const fields = get_field_edit_form();

    const model: GncDto = {
      id: gnc.id,
      idEmpresa: gnc.idEmpresa,
      idMaquinaria: gnc.idMaquinaria,
      fecha: gnc.fecha,
    };
    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Gnc',
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
      await this.GncService.editGnc(data);
      await this.updateTable();
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

  async delete(gnc: GncDto) {
    try {
      await this.GncService.deleteGnc(gnc.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== gnc.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(gnc: GncDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de GNC',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(gnc);
      },
    });
  }

  get_gnc_family_descripcion(gnc: GncDto): string {
    return get_lang_description(gnc.maquinaria?.familia?.langs!, LANG_ES);
  }

  get_gnc_subFamily_descripcion(gnc: GncDto): string {
    return get_lang_description(gnc.maquinaria?.subFamilia?.langs!, LANG_ES);
  }

  export_excel() {
    const data_to_sheet = this.value.map((gnc) => {
      return {
        Maquinaria: gnc.maquinaria?.matricula,
        Nombre_del_centro: gnc.maquinaria?.nombreCentro,
        Delegación: gnc.maquinaria?.nombreGrupoCentro,
        Familia: this.get_gnc_family_descripcion(gnc),
        Subfamilia: this.get_gnc_subFamily_descripcion(gnc),
        Fecha_próxima: gnc.fecha,
      };
    });
    export_data_to_excel(data_to_sheet, 'Gnc');
  }
}
