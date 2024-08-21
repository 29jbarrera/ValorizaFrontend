import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { GastosService } from '../gastos.service';

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
import { GastoTallerDto } from '@valoriza/web-commons';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  CommonTable,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-gastos-table',
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
    SearchFormTableComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
  templateUrl: './gastos-table.component.html',
  styleUrl: './gastos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class GastosTableComponent
  extends CommonTable<GastoTallerDto>
  implements OnInit
{
  public search_term: any = '';

  constructor(
    private GastosService: GastosService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }
  ngOnInit() {}

  override get_values(page: number = 1, pageSize: number = 100) {
    return this.GastosService.getGastos(page, pageSize);
  }

  async edit(gastoTaller: GastoTallerDto) {
    try {
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

  async delete(gastoTaller: GastoTallerDto) {
    try {
      await this.GastosService.deleteGastos(gastoTaller.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== gastoTaller.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(gastoTaller: GastoTallerDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de gastos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(gastoTaller);
      },
    });
  }
}
