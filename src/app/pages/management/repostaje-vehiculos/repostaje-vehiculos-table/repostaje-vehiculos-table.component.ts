import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RepostajeDto } from '@valoriza/web-commons';
import { RepostajeVehiculosService } from '../repostaje-vehiculos.service';

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
  selector: 'app-repostaje-vehiculos-table',
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
  templateUrl: './repostaje-vehiculos-table.component.html',
  styleUrl: './repostaje-vehiculos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class RepostajeVehiculosTableComponent
  extends CommonTable<RepostajeDto>
  implements OnInit
{
  repostajeVehiculos: RepostajeDto[] = [];

  constructor(
    private RepostajeVehiculosService: RepostajeVehiculosService,

    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }
  ngOnInit() {
    this.updateTable();
  }

  override async updateTable() {
    this.repostajeVehiculos =
      await this.RepostajeVehiculosService.getRepostajeVehiculos();
    this.loading = false;
  }

  async edit(repostajeVehiculo: RepostajeDto) {
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

  async delete(repostajeVehiculo: RepostajeDto) {
    try {
      await this.RepostajeVehiculosService.deleteRepostajeVehículos(
        repostajeVehiculo.id!
      );
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.repostajeVehiculos = this.repostajeVehiculos.filter(
        (o) => o.id !== repostajeVehiculo.id
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

  async confirm_delete(repostajeVehiculo: RepostajeDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de repostaje vehículos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(repostajeVehiculo);
      },
    });
  }
}
