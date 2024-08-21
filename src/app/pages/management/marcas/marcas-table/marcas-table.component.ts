import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateMarcaDto, MarcaDto } from '@valoriza/web-commons';
import { MarcasService } from '../marcas.service';

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
import { get_field_create_or_edit_form } from './types';
import { ModalController } from '@ionic/angular';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
  CommonTable,
  export_data_to_excel,
  ModalFormComponent,
} from '@valoriza/web-components';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-marcas-table',
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
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
  templateUrl: './marcas-table.component.html',
  styleUrl: './marcas-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class MarcasTableComponent
  extends CommonTable<MarcaDto>
  implements OnInit
{
  marcas: MarcaDto[] = [];

  constructor(
    private MarcasService: MarcasService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalController: ModalController
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override async updateTable() {
    this.marcas = await this.MarcasService.getMarcas();
    this.loading = false;
  }

  async edit(marca: MarcaDto) {
    const fields = get_field_create_or_edit_form();

    const model: MarcaDto = {
      id: marca.id,
      idEmpresa: marca.idEmpresa,
      descripcion: marca.descripcion,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Marca',
        role: 'edit',
        submit_text: 'Editar',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'edit') {
      return;
    }

    try {
      await this.MarcasService.edit(data);
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

  async open_modal_to_create() {
    const fields = get_field_create_or_edit_form();

    const model: CreateMarcaDto = {
      // Sin descripción
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Marca',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create') {
      return;
    }
    await this.create(data);
  }

  private async create(body: CreateMarcaDto) {
    try {
      await this.MarcasService.create(body);

      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Marca creada correctamente',
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

  async delete(marca: MarcaDto) {
    try {
      await this.MarcasService.deleteMarcas(marca.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.marcas = this.marcas.filter((o) => o.id !== marca.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(marca: MarcaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de marcas',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(marca);
      },
    });
  }

  export_excel() {
    const data_to_sheet = this.marcas.map((marca) => {
      return {
        Nombre: marca.descripcion,
      };
    });
    export_data_to_excel(data_to_sheet, 'Marcas');
  }
}
