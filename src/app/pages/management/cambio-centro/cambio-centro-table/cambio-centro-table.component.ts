import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { MaquinariaDto } from '@valoriza/web-commons';
import { CambioCentroService } from '../cambio-centro.service';

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
import { CheckboxModule } from 'primeng/checkbox';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import {
  export_data_to_excel,
  SearchFormTableComponent,
} from '@valoriza/web-components';

@Component({
  selector: 'app-cambio-centro-table',
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
    CheckboxModule,
    ProgressBarModule,
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './cambio-centro-table.component.html',
  styleUrl: './cambio-centro-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class CambioCentroTableComponent implements OnInit {
  cambioCentro: MaquinariaDto[] = [];
  selectCambioCentro: MaquinariaDto[] = [];
  public loading: boolean = true;

  search_model: any = {};
  search_options: FormlyFormOptions = {};
  search_fields: FormlyFieldConfig[] = [];

  constructor(
    private CambioCentroService: CambioCentroService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.updateTable();
  }

  async search(model: any) {
    console.error('TODO: Filtros', model);
  }

  async updateTable() {
    this.cambioCentro = await this.CambioCentroService.getCambioCentro();
    this.loading = false;
  }

  async edit(cambioCentro: MaquinariaDto) {
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

  async delete(cambioCentro: MaquinariaDto) {
    try {
      await this.CambioCentroService.deleteCambioCentro(cambioCentro.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.cambioCentro = this.cambioCentro.filter(
        (o) => o.id !== cambioCentro.id
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

  async confirm_delete(cambioCentro: MaquinariaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de cambios centros',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(cambioCentro);
      },
    });
  }

  //TODO: ADD data
  export_excel() {
    const data_to_sheet = this.cambioCentro.map((cambioCentro) => {
      return {};
    });
    export_data_to_excel(data_to_sheet, 'Stock');
  }
}
