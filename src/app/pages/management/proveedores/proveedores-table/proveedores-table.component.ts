import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CreateProveedorDto, ProveedorDto } from '@valoriza/web-commons';
import { ProveedoresService } from '../proveedores.service';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule, HttpErrorResponse } from '@angular/common/http';
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
import { ButtonCreateComponent } from '../../../../components/button-create/button-create.component';
import { get_field_create_or_edit_proveedores } from './types';
import { ModalController } from '@ionic/angular';
import {
  CommonTable,
  export_data_to_excel,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-proveedores-table',
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
    SearchFormTableComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
  templateUrl: './proveedores-table.component.html',
  styleUrl: './proveedores-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class ProveedoresTableComponent
  extends CommonTable<ProveedorDto>
  implements OnInit
{
  proveedores: ProveedorDto[] = [];

  constructor(
    private ProveedoresService: ProveedoresService,

    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
  }
  ngOnInit() {
    this.updateTable();
  }

  override async updateTable(page: number = 1, perPage: number = 100) {
    this.loading = true;
    const response = await this.ProveedoresService.getProveedores(
      page,
      perPage
    );
    this.proveedores = response.results || [];
    this.totalRecords = response.total || 0;
    this.loading = false;
  }

  async edit(proveedor: ProveedorDto) {
    const fields = get_field_create_or_edit_proveedores(this.proveedores);

    const model: ProveedorDto = {
      id: proveedor.id,
      idEmpresa: proveedor.idEmpresa,
      docIdentificacion: proveedor.docIdentificacion,
      nombre: proveedor.nombre,
      direccion: proveedor.direccion,
      telefono: proveedor.telefono,
      comentarios: proveedor.comentarios,
      sap: proveedor.sap,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar proveedor',
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
      await this.ProveedoresService.edit(data);
      await this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Proveedor actualizado correctamente',
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

  async delete(proveedor: ProveedorDto) {
    try {
      await this.ProveedoresService.deleteProveedores(proveedor.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.proveedores = this.proveedores.filter((o) => o.id !== proveedor.id);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorMessage = error.error?.message;

        if (
          errorMessage ===
          'No podemos eliminar este registro porque tiene registros relacionados'
        ) {
          this._confirmationService.confirm({
            message:
              'No se puede eliminar porque tiene gastos de taller asociados.',
            header: 'Cabecera',
            icon: 'fa fa-exclamation-circle',
            rejectVisible: false,
            acceptButtonStyleClass: 'p-button-primary',
            acceptLabel: 'Aceptar',

            accept: async () => {},
          });
        } else {
          this.messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: 'Algo inesperado ocurrió',
            life: 3000,
          });
        }
      }
      return;
    }
  }

  async confirm_delete(proveedor: ProveedorDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de proveedores',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(proveedor);
      },
    });
  }

  async open_modal_to_create() {
    const fields = get_field_create_or_edit_proveedores(this.proveedores);

    const model: CreateProveedorDto = {
      docIdentificacion: '',
      nombre: '',
      direccion: '',
      telefono: '',
      comentarios: '',
      sap: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear un proveedor',
        role: 'create_proveedor',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create_proveedor') {
      return;
    }
    await this.create(data);
  }

  private async create(body: CreateProveedorDto) {
    try {
      await this.ProveedoresService.create(body);
      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Proveedor creado correctamente',
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

  export_excel() {
    const data_to_sheet = this.proveedores.map((proveedor) => {
      return {
        ID: proveedor.id,
        Doc_Identificación: proveedor.docIdentificacion,
        Nombre: proveedor.nombre,
        Dirección: proveedor.direccion,
        Teléfono: proveedor.telefono,
        Comentarios: proveedor.comentarios,
        SAP: proveedor.sap,
      };
    });
    export_data_to_excel(data_to_sheet, 'Proveedores');
  }
}
