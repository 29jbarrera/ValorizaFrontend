import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RatiosCentroService } from '../ratios-centro.service';

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
  selector: 'app-ratios-centro-table',
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
  templateUrl: './ratios-centro-table.component.html',
  styleUrl: './ratios-centro-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class RatiosCentroTableComponent extends CommonTable<any> implements OnInit {
  searchForm: FormGroup;

  constructor(
    private RatiosCentroService: RatiosCentroService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
    this.searchForm = this.fb.group({
      dateFrom: [''],
      dateUntil: [''],
      centre: [''],
      repairs: [''],
      insurance: [''],
      tax: [''],
      Amortization: [''],
      financial: [''],
      rate: [''],
      ratio: [''],
      currency: [''],
    });
  }

  ngOnInit() {
    this.updateTable();
  }

  async confirm_edit(ratiosCentro: any) {
    try {
      this.edit(ratiosCentro);

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

  async edit(ratiosCentro: any) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', ratiosCentro);
  }

  async delete(ratiosCentro: any) {
    // TODO: PETICIÓN BACKEND PARA ELIMINAR
    console.error('Delete object,', ratiosCentro);
  }

  async confirm_delete(ratiosCentro: any) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de ratios centro',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        try {
          await this.delete(ratiosCentro);
          this.messageService.add({
            severity: 'success',
            summary: 'Confirmado',
            detail: 'Fila eliminada correctamente',
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
