import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { SeguroDto } from '@valoriza/web-commons';
import { SegurosService } from '../seguros.service';

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
import {
  CommonTable,
  export_data_to_excel,
  format_price_amount,
  ModalFormComponent,
  SearchFormTableComponent,
  ValorizaTypesService,
  Selection,
} from '@valoriza/web-components';
import { ProgressBarModule } from 'primeng/progressbar';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { get_field_edit_form } from './types';
import { LoadingController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-seguros-table',
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
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
  ],
  templateUrl: './seguros-table.component.html',
  styleUrl: './seguros-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class SegurosTableComponent
  extends CommonTable<SeguroDto>
  implements OnInit
{
  estadosSeguro: Selection[] = [];
  tiposSeguros: Selection[] = [];

  constructor(
    private SegurosService: SegurosService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController,
    private loadingController: LoadingController,
    private valorizaTypesService: ValorizaTypesService
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
    this.loadEstadosSeguro();
    this.loadTipoSeguro();
  }

  async loadEstadosSeguro() {
    this.estadosSeguro = await this.valorizaTypesService.getEstadoSeguro();
  }

  async loadTipoSeguro() {
    this.tiposSeguros = await this.valorizaTypesService.getTipoSeguro();
  }

  get_estado(seguro: SeguroDto) {
    return this.estadosSeguro.find((e) => seguro.codEstadoSeguro === e.value)
      ?.label;
  }

  get_tipo(seguro: SeguroDto) {
    return this.tiposSeguros.find((t) => seguro.codTipoSeguro === t.value)
      ?.label;
  }

  override get_values(page: number = 1, pageSize: number = 100) {
    return this.SegurosService.getSeguros(page, pageSize);
  }

  async edit(seguro: SeguroDto) {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();
    const fields = get_field_edit_form(this.estadosSeguro, this.tiposSeguros);

    const model: any = {
      id: seguro.id,
      codigo: seguro.codigo,
      idEmpresa: seguro.idEmpresa,
      aseguradora: seguro.aseguradora,
      fechaInicio: seguro.fechaInicio,
      fechaFin: seguro.fechaFin,
      importe: seguro.importe,
      codMoneda: seguro.codMoneda,
      comentario: seguro.comentario,
      codTipoSeguro: seguro.codTipoSeguro,
      codEstadoSeguro: seguro.codEstadoSeguro,
      idMaquinaria: seguro.idMaquinaria,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Seguro',
        role: 'edit',
        submit_text: 'Editar',
      },
    });

    await loading.dismiss();

    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'edit') {
      return;
    }

    try {
      await this.SegurosService.edit(data);
      await this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Elemento actualizado correctamente',
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

  async delete(seguros: SeguroDto) {
    try {
      await this.SegurosService.deleteSeguros(seguros.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== seguros.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(seguros: SeguroDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de seguros',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(seguros);
      },
    });
  }

  format_price_amount(amount: number) {
    return format_price_amount(amount);
  }

  export_excel() {
    const data_to_sheet = this.value.map((seguro) => {
      return {
        ID: seguro.id,
        Máquina: seguro?.maquinaria?.matricula,
        Código_Centro: seguro?.maquinaria?.codigoCentro,
        Aseguradora: seguro.aseguradora,
        Estado: seguro.codEstadoSeguro,
        Tipo: seguro.codTipoSeguro,
        Póliza: seguro.codigo,
        Fecha_Inicio: seguro.fechaInicio,
        Fecha_Fin: seguro.fechaFin,
        Importe: seguro.importe,
        Divisa: seguro.codMoneda,
        Comentarios: seguro.comentario,
      };
    });
    export_data_to_excel(data_to_sheet, 'Seguros');
  }
}
