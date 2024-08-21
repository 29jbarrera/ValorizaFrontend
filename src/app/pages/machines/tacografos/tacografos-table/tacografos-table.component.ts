import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TacografosService } from '../tacografos.service';
import { TacografoDto } from '@valoriza/web-commons';

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
import {
  CommonTable,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { get_field_edit_form } from '../types';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-tacografos-table',
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
  templateUrl: './tacografos-table.component.html',
  styleUrl: './tacografos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TacografosTableComponent
  extends CommonTable<TacografoDto>
  implements OnInit
{
  constructor(
    private TacografosService: TacografosService,

    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override get_values(
    page?: number,
    pageSize?: number
  ): Promise<{
    hasNext?: boolean;
    hasPrev?: boolean;
    total?: number;
    page?: number;
    perPage?: number;
    pages?: number;
    results?: TacografoDto[] | undefined;
  }> {
    return this.TacografosService.getTacografos(page, pageSize);
  }

  async edit(tacografo: TacografoDto) {
    const fields = get_field_edit_form();

    const model: TacografoDto = {
      id: tacografo.id,
      idEmpresa: tacografo.idEmpresa,
      idMaquinaria: tacografo.idMaquinaria,
      fecha: tacografo.fecha,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar tacógrafo',
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
      await this.TacografosService.edit(data);
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

  async delete(tacografo: TacografoDto) {
    try {
      await this.TacografosService.deleteTacografos(tacografo.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== tacografo.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(tacografo: TacografoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de tacógrafos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(tacografo);
      },
    });
  }

  get_tacografo_family_descripcion(tacografo: TacografoDto): string {
    return get_lang_description(
      tacografo?.maquinaria?.familia?.langs || [],
      LANG_ES
    );
  }

  get_tacografo_subFamily_descripcion(tacografo: TacografoDto): string {
    return get_lang_description(
      tacografo?.maquinaria?.subFamilia?.langs || [],
      LANG_ES
    );
  }

  export_excel() {
    const data_to_sheet = this.value.map((tacografo) => {
      return {
        ID: tacografo.id,
        Maquinaria: tacografo.maquinaria?.matricula,
        Centro: tacografo.maquinaria?.nombreCentro,
        Delegación: tacografo.maquinaria?.nombreGrupoCentro,
        Familia: this.get_tacografo_family_descripcion(tacografo),
        Subfamilia: this.get_tacografo_subFamily_descripcion(tacografo),
        Fecha_Próxima: tacografo.fecha,
      };
    });
    export_data_to_excel(data_to_sheet, 'Tacógrafos');
  }
}
