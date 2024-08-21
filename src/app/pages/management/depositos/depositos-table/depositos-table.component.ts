import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { DepositoDto, DepositoViewDto } from '@valoriza/web-commons';
import { DepositosService } from '../depositos.service';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import {
  CommonTable,
  SearchFormTableComponent,
  SelectorType,
  ValorizaTypesService,
} from '@valoriza/web-components';
import { get_fields_search_table_depositos } from './types';

@Component({
  selector: 'app-depositos-table',
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
  templateUrl: './depositos-table.component.html',
  styleUrl: './depositos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class DepositosTableComponent
  extends CommonTable<DepositoViewDto>
  implements OnInit
{
  centros: SelectorType[] = [];

  override search_model: any = {};
  override search_options: FormlyFormOptions = {};
  override search_fields: FormlyFieldConfig[] = [];

  constructor(
    private DepositosService: DepositosService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private valorizaService: ValorizaTypesService
  ) {
    super();
  }

  ngOnInit() {
    this.search_model = {
      comun: undefined,
      nombre: undefined,
      descripcion: undefined,
      capacidad: undefined,
    };

    this.loadCentros();
  }

  private loadCentros() {
    this.valorizaService.getCentrosLabel().then((centros) => {
      this.centros = centros;
      this.search_fields = get_fields_search_table_depositos(this.centros);
    });
  }

  override async get_values(page: number = 1, pageSize: number = 100) {
    return this.DepositosService.getDepositos(page, pageSize, this.filter);
  }

  async edit(deposito: DepositoDto) {
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

  async delete(deposito: DepositoDto) {
    try {
      await this.DepositosService.deleteDepositos(deposito.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== deposito.id);
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

  async confirm_delete(deposito: DepositoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de depósitos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(deposito);
      },
    });
  }

  get_icon_depositos_comun(comun: boolean): string {
    return comun
      ? 'text-green-500 pi-check-circle'
      : 'text-red-500 pi-times-circle';
  }
}
