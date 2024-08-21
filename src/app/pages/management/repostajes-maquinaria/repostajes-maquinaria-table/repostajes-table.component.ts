import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// TODO: Import the necessary modules
// import { MantenimientoRepostajeDto } from '@valoriza/web-commons';
type MantenimientoRepostajeDto = any;

import { RepostajesService } from '../repostajes-maquinaria.service';

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
  selector: 'app-repostajes-table',
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
  templateUrl: './repostajes-table.component.html',
  styleUrl: './repostajes-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class RepostajesMaquinariaTableComponent
  extends CommonTable<MantenimientoRepostajeDto>
  implements OnInit
{
  repostaje: MantenimientoRepostajeDto[] = [];

  constructor(
    private RepostajesService: RepostajesService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override async updateTable() {
    this.repostaje = await this.RepostajesService.getRepostajes();
    this.loading = false;
  }

  async edit(repostaje: MantenimientoRepostajeDto) {
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

  async delete(repostaje: MantenimientoRepostajeDto) {
    try {
      await this.RepostajesService.deleteRepostajes(repostaje.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.repostaje = this.repostaje.filter((o) => o.id !== repostaje.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(repostaje: MantenimientoRepostajeDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de repostajes maquinaria',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(repostaje);
      },
    });
  }
}
