import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

// TODO: Import the necessary modules
// import { TasasHistoricoDto } from '@valoriza/web-commons';
type TasasHistoricoDto = any;
import { TasasCentroService } from '../tasas-centro.service';

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
import { CommonTable, SearchFormTableComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-tasas-centro-table',
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
    SearchFormTableComponent
  ],
  templateUrl: './tasas-centro-table.component.html',
  styleUrl: './tasas-centro-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class TasasCentroTableComponent extends CommonTable<TasasHistoricoDto> implements OnInit {
  searchForm: FormGroup;

  constructor(
    private TasasCentroService: TasasCentroService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
    this.searchForm = this.fb.group({
      dateForm: [''],
      dateUntil: [''],
      delegation: [''],
      code: [''],
      name: [''],
      cost: [''],
      tasaTotal: [''],
      currency: [''],
    });
  }

  ngOnInit() {
    // this.updateTable();
  }

  // override get_values(page: number = 1 , pageSize: number = 100) {
  //     return this.TasasCentroService.getTasasCentro(page, pageSize);
  // }

  async confirm_edit(tasasCentro: TasasHistoricoDto) {
    try {
      this.edit(tasasCentro);

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

  async edit(tasasCentro: TasasHistoricoDto) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', tasasCentro);
  }

  async delete(tasasCentro: TasasHistoricoDto) {
    try {
      await this.TasasCentroService.deleteTasasCentro(tasasCentro.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter(
        (o) => o.id !== tasasCentro.id
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

  async confirm_delete(tasasCentro: TasasHistoricoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de tasas centro',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(tasasCentro);
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
