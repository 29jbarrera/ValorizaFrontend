import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { HorometrosKilometrosService } from '../horometros-kilometros.service';

import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';

import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { HmKmDto, UpdateHmKmDto } from '@valoriza/web-commons';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  CommonTable,
  export_data_to_excel,
  format_date,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { LoadingController } from '@ionic/angular';
import { get_field_edit_form } from './types';
import { ModalController } from '@ionic/angular/standalone';

@Component({
  selector: 'app-horometros-kilometros-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressBarModule,
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './horometros-kilometros-table.component.html',
  styleUrl: './horometros-kilometros-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class HorometrosKilometrosTableComponent
  extends CommonTable<HmKmDto>
  implements OnInit
{
  constructor(
    private HorometrosKilometrosService: HorometrosKilometrosService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private loadingController: LoadingController,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    // this.updateTable();
  }

  override get_values(page: number = 1, pageSize: number = 100) {
    return this.HorometrosKilometrosService.getHorometrosKilometros(
      page,
      pageSize
    );
  }

  async edit(HmKm: UpdateHmKmDto) {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    const formattedFecha = String(HmKm.fecha).split('T')[0];

    // const formattedFecha = new Date(HmKm.fecha);

    const fields = get_field_edit_form();

    const model: UpdateHmKmDto = {
      fecha: formattedFecha as any,
      id: HmKm.id,
      horas: HmKm.horas,
      kilometros: HmKm.kilometros,
      tipo: HmKm.tipo,
      externa: HmKm.externa,
      idReferencia: HmKm.idReferencia,
      idMaquinaria: HmKm.idMaquinaria,
    };

    console.log(model);

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar HmKm',
        role: 'edit',
        submit_text: 'Editar',
      },
    });
    await loading.dismiss();
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'edit') {
      return;
    }

    try {
      const response = await this.HorometrosKilometrosService.edit(data);
      console.log('API response:', response);
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

  async delete(HmKm: HmKmDto) {
    try {
      await this.HorometrosKilometrosService.deleteHorometrosKilometros(
        HmKm.id!
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== HmKm.id);
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

  async confirm_delete(HmKm: HmKmDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de Horómetros',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(HmKm);
      },
    });
  }

  get_hmkm_subfamilia_descripcion(HmKm: HmKmDto): string {
    return get_lang_description(HmKm?.maquinaria?.subFamilia?.langs!, LANG_ES);
  }

  export_excel() {
    const data_to_sheet = this.value.map((HmKm) => {
      return {
        ID: HmKm.id,
        Centro_Máquina: HmKm.maquinaria?.centrosCoste?.nombre,
        SubFamilia: this.get_hmkm_subfamilia_descripcion(HmKm),
        Maquinaria: HmKm.maquinaria?.matricula,
        Marca: HmKm.maquinaria?.chasis?.marca,
        Modelo: HmKm.maquinaria?.chasis?.modelo,
        Horómetro_final: HmKm.horas,
        Kilometros_final: HmKm.kilometros,
        Fecha: format_date(String(HmKm.fecha)),
      };
    });
    export_data_to_excel(data_to_sheet, 'HmKm');
  }

}
