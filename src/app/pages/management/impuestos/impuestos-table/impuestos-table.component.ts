import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ImpuestoDto, ImpuestoViewsDto } from '@valoriza/web-commons';
import { ImpuestosService } from '../impuestos.service';

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
  CommonTable,
  export_data_to_excel,
  format_price_amount,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';

@Component({
  selector: 'app-impuestos-table',
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
  templateUrl: './impuestos-table.component.html',
  styleUrl: './impuestos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ImpuestosTableComponent
  extends CommonTable<ImpuestoViewsDto>
  implements OnInit
{
  impuestos: ImpuestoViewsDto[] = [];

  constructor(
    private ImpuestosService: ImpuestosService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override async updateTable() {
    this.impuestos = await this.ImpuestosService.getImpuestos();
    this.loading = false;
  }

  async edit(impuesto: ImpuestoDto) {
    try {
      this.edit(impuesto);

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Fila actualizada correctamente',
        life: 3000,
      });
      this.updateTable();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async delete(impuesto: ImpuestoDto) {
    try {
      await this.ImpuestosService.deleteImpuestos(impuesto.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.impuestos = this.impuestos.filter((o) => o.id !== impuesto.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(impuesto: ImpuestoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de impuestos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(impuesto);
      },
    });
  }

  format_price_amount(amount: number) {
    return format_price_amount(amount);
  }

  export_excel() {
    const data_to_sheet = this.impuestos.map((impuesto) => {
      return {
        Id: impuesto?.id,
        Centro: impuesto?.nombreCentro,
        Dirección: impuesto?.nombreGrupo,
        Matrícula: impuesto?.matricula,
        Impuesto: impuesto?.importe,
        Divisa: impuesto?.codMoneda,
        Fecha: new Date(impuesto?.fecha!).toLocaleDateString('es-ES'),
      };
    });
    export_data_to_excel(data_to_sheet, 'Impuestos');
  }
}
