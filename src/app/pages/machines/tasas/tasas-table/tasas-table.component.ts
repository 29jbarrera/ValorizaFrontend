import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { TasasService } from '../tasas.service';
// TODO: Import the necessary modules
// import { TasasHistoricoDto } from '@valoriza/web-commons';
type TasasHistoricoDto = any;
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
import { CommonTable } from '@valoriza/web-components';

@Component({
  selector: 'app-tasas-table',
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
  ],
  templateUrl: './tasas-table.component.html',
  styleUrl: './tasas-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TasasTableComponent
  extends CommonTable<TasasHistoricoDto>
  implements OnInit
{
  searchForm: FormGroup;

  constructor(
    private TasasService: TasasService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
    this.searchForm = this.fb.group({
      dateFrom: [''],
      dateUntil: [''],
      machineCentre: [''],
      subFamily: [''],
      tuition: [''],
      frame: [''],
      totalRate: [''],
      chassisRate: [''],
      currency: [''],
      implement1: [''],
      rate1: [''],
      currency1: [''],
      implement2: [''],
      rate2: [''],
      currency2: [''],
    });
  }

  ngOnInit() {
    this.updateTable();
  }

  // async updateTable() {
  //   this.tasas = await this.TasasService.getTasas();
  //   this.loading = false;
  // }

  async confirm_edit(tasa: TasasHistoricoDto) {
    try {
      this.edit(tasa);

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

  async edit(tasa: TasasHistoricoDto) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', tasa);
  }

  async delete(tasa: TasasHistoricoDto) {
    try {
      await this.TasasService.deleteTasas(tasa.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== tasa.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(tasa: TasasHistoricoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de tasas',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(tasa);
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
}
