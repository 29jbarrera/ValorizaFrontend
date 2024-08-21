import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { RatiosMaquinaria } from '../type';
import { RatiosMaquinariaService } from '../ratios-maquinaria.service';

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
import { MaquinariaDto } from '@valoriza/web-commons';
import { CommonTable, SearchFormTableComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-ratios-maquinaria-table',
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
  templateUrl: './ratios-maquinaria-table.component.html',
  styleUrl: './ratios-maquinaria-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class RatiosMaquinariaTableComponent extends CommonTable<MaquinariaDto> implements OnInit {
  ratiosMaquinaria: MaquinariaDto[] = [];
  searchForm: FormGroup;

  constructor(
    private RatiosMaquinariaService: RatiosMaquinariaService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
    this.searchForm = this.fb.group({
      dateFrom: [''],
      dateUntil: [''],
      tuition: [''],
      centre: [''],
      repairs: [''],
      insurance: [''],
      tax: [''],
      amortization: [''],
      financial: [''],
      rate: [''],
      ratio: [''],
      currency: [''],
    });
  }

  ngOnInit() {
    this.updateTable();
  }

  override get_values(page = 1, perPage = 100) {
    return this.RatiosMaquinariaService.getRatiosMaquinaria(page, perPage);
  }

  async confirm_edit(ratiosMaquinaria: RatiosMaquinaria) {
    try {
      this.edit(ratiosMaquinaria);

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

  async edit(ratiosMaquinaria: RatiosMaquinaria) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', ratiosMaquinaria);
  }

  async delete(ratiosMaquinaria: RatiosMaquinaria) {
    // TODO: PETICIÓN BACKEND PARA ELIMINAR
    console.error('Delete object,', ratiosMaquinaria);
  }

  async confirm_delete(ratiosMaquinaria: RatiosMaquinaria) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de ratios maquinaria',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        try {
          await this.delete(ratiosMaquinaria);
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
