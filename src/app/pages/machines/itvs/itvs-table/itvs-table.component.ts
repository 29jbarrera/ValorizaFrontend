import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { InspeccionTecnicaDto } from '@valoriza/web-commons';
import { ItvsService } from '../itvs.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  CommonTable,
  export_data_to_excel,
  SearchFormTableComponent,
  SelectorType,
  ValorizaTypesService,
} from '@valoriza/web-components';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { InspeccionTecnicaViewDto } from 'src/app/typescript-angular-client-generated/model/inspeccionTecnicaViewDto';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { get_fields_search_table_itvs } from './types';

@Component({
  selector: 'app-itvs-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule,
    ProgressBarModule,
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './itvs-table.component.html',
  styleUrl: './itvs-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ItvsTableComponent
  extends CommonTable<InspeccionTecnicaViewDto>
  implements OnInit
{
  override search_model: any = {};
  override search_options: FormlyFormOptions = {};
  override search_fields: FormlyFieldConfig[] = [];

  centros: SelectorType[] = [];
  familias: SelectorType[] = [];

  constructor(
    private ItvsService: ItvsService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private valorizaService: ValorizaTypesService
  ) {
    super();
  }
  ngOnInit() {
    this.search_model = {
      centro: undefined,
      familia: undefined,
      matricula: undefined,
      fechafrom: undefined,
      fechato: undefined,
      comentarios: undefined,
    };
    this.getSearchFields();
  }

  // TODO: ADD MAQUINARIA TO SELECT
  async getSearchFields() {
    try {
      const centros = await this.valorizaService.getCentrosLabel();
      const familias = await this.valorizaService.getFamiliasLabel();
      // const maquinaria = await this.valorizaService.
      this.search_fields = get_fields_search_table_itvs(centros, familias);
    } catch (error) {
      return;
    }
  }

  override get_values(
    page: number = 1,
    pageSize: number = 10
  ){
    return this.ItvsService.getItvs(page, pageSize, this.filter);
  }

  async edit(itv: InspeccionTecnicaDto) {
    try {
      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Fila actualizada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== itv.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async delete(itv: InspeccionTecnicaDto) {
    try {
      await this.ItvsService.deleteItvs(itv.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== itv.id);
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

  async confirm_delete(itv: InspeccionTecnicaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de Itvs',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(itv);
      },
    });
  }

  // TODO: Completar datos
  export_excel() {
    const data_to_sheet = this.value.map((itv) => {
      return {
        ID: itv?.id,
        Maquinaria: itv?.matricula,
        Centro: itv?.centro,
        Delegación: itv?.delegacion,
        Familia: itv?.familia,
        Subfamilia: itv?.subfamilia,
        Fecha: itv?.fecha,
        Fecha_Próxima: itv?.fechaProxima,
        Importe: '',
        Divisa: '',
        Comentarios: itv?.comentarios,
      };
    });
    export_data_to_excel(data_to_sheet, 'Itvs');
  }
}
