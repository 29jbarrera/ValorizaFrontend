import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { ReparacionesCentroService } from '../reparaciones-centro.service';
import { ReparacionDto, ReparacionesDocDto } from '@valoriza/web-commons';

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
  SearchFormTableComponent,
} from '@valoriza/web-components';

@Component({
  selector: 'app-reparaciones-centro-table',
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
  ],
  templateUrl: './reparaciones-centro-table.component.html',
  styleUrl: './reparaciones-centro-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ReparacionesCentroTableComponent
  extends CommonTable<ReparacionDto>
  implements OnInit
{
  reparacionesCentro: ReparacionDto[] = [];

  constructor(
    private ReparacionesCentroService: ReparacionesCentroService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override get_values(page?: number, pageSize?: number) {
    return this.ReparacionesCentroService.getReparacionesCentro(page, pageSize);
  }

  async edit(reparacionesCentro: ReparacionesDocDto) {
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

  async delete(reparacionesCentro: ReparacionDto) {
    try {
      await this.ReparacionesCentroService.deleteReparacionesCentro(
        reparacionesCentro.id!
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.reparacionesCentro = this.reparacionesCentro.filter(
        (o) => o.id !== reparacionesCentro.id
      );
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(reparacionesCentro: ReparacionesDocDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de reparaciones centro',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(reparacionesCentro);
      },
    });
  }
}
