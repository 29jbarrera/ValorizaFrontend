import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  CreateOperationCustom,
  InstalacionesService,
  UpdateOperationCustom,
} from '../instalaciones.service';

import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import {
  CreateInstalacionDto,
  CreateInstalacionesElementoDto,
  InstalacionDto,
  InstalacionesElementoDto,
  InstalacionesOperacioneDto,
  UpdateInstalacionesElementoDto,
} from '@valoriza/web-commons';
import { ProgressBarModule } from 'primeng/progressbar';
import { ModalController } from '@ionic/angular';
import {
  get_field_create_or_edit_form_elementos,
  get_field_create_or_edit_form_instalaciones,
  get_field_create_or_edit_form_operaciones,
} from './types';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
  CommonTable,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { LoadingController } from '@ionic/angular/standalone';
import { DropdownModule } from 'primeng/dropdown';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-instalaciones-table',
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ButtonModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressBarModule,
    ButtonCreateComponent,
    DropdownModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    SearchFormTableComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
  templateUrl: './instalaciones-table.component.html',
  styleUrl: './instalaciones-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class InstalacionesTableComponent
  extends CommonTable<InstalacionDto>
  implements OnInit
{
  instalaciones: InstalacionDto[] = [];
  public expandedRowsInstalaciones = {};
  public expandedRowsElementos = {};

  constructor(
    private InstalacionesService: InstalacionesService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
  }

  override async updateTable(page: number = 1, perPage: number = 100) {
    this.loading = true;
    const response = await this.InstalacionesService.getInstalaciones(
      page,
      perPage
    );
    this.instalaciones = response.results || [];
    this.totalRecords = response.total || 0;
    this.loading = false;
    this.loading = false;
  }

  // INSTALACIONES
  async open_modal_to_create() {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const centros = await this.InstalacionesService.getCentros();

    const fields = get_field_create_or_edit_form_instalaciones(centros);

    const model: CreateInstalacionDto = {
      idCentro: 0,
      nombre: '',
      comentarios: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Instalación',
        role: 'create',
        submit_text: 'Crear',
      },
    });

    await loading.dismiss();

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }
    await this.create(data);
  }

  private async create(body: CreateInstalacionDto) {
    try {
      await this.InstalacionesService.createInstalaciones(body);

      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Instalación creado correctamente',
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

  async edit_instalacion(instalacion: InstalacionDto) {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const centros = await this.InstalacionesService.getCentros();

    const fields = get_field_create_or_edit_form_instalaciones(centros);

    const model: InstalacionDto = {
      id: instalacion.id,
      idEmpresa: instalacion.idEmpresa,
      idCentro: instalacion.idCentro,
      nombre: instalacion.nombre,
      comentarios: instalacion.comentarios,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Instalación',
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
      await this.InstalacionesService.editInstalaciones(data);
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

  async confirm_delete_instalacion(instalacion: InstalacionDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de instalaciones',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_instalacion(instalacion);
      },
    });
  }

  async delete_instalacion(instalacion: InstalacionDto) {
    try {
      await this.InstalacionesService.deleteInstalaciones(instalacion.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.instalaciones = this.instalaciones.filter(
        (o) => o.id !== instalacion.id
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

  // ELEMENTOS
  async open_modal_to_create_elemento(idInstalacion: number) {
    const fields = get_field_create_or_edit_form_elementos();

    const model: CreateInstalacionesElementoDto = {
      idInstalacion: idInstalacion,
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Elemento',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }
    await this.create_elemento(data);
  }

  private async create_elemento(body: CreateInstalacionesElementoDto) {
    try {
      const response = await this.InstalacionesService.createElemento(body);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: [...(instalacion.elementos || []), response],
        };
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Instalación creado correctamente',
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

  async edit_elemento(elemento: InstalacionesElementoDto) {
    const fields = get_field_create_or_edit_form_elementos();

    const model: UpdateInstalacionesElementoDto = {
      id: elemento.id,
      idEmpresa: elemento.idEmpresa!,
      idInstalacion: elemento.idInstalacion!,
      descripcion: elemento.descripcion!,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Elemento',
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
      const response = await this.InstalacionesService.editElemento(data);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: instalacion.elementos?.map((elemento) => {
            if (elemento.id === response.id) {
              return { ...elemento, ...response };
            }

            return elemento;
          }),
        };
      });

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

  async confirm_delete_elemento(elemento: InstalacionesElementoDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este elemento?',
      header: 'Eliminar fila de instalaciones',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_elemento(elemento);
      },
    });
  }

  async delete_elemento(elemento: InstalacionesElementoDto) {
    try {
      await this.InstalacionesService.deleteElemento(elemento.id!);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: instalacion.elementos?.filter(
            (_elemento) => _elemento.id !== elemento.id
          ),
        };
      });

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
  }

  // OPERACIONES
  async open_modal_to_create_operacion(idElemento: number) {
    const fields = get_field_create_or_edit_form_operaciones();

    const model: CreateOperationCustom = {
      idElemento: idElemento,
      fecha: '',
      actuante: '',
      frecuencia: 0,
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Operacion',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }
    await this.create_operacion(data);
  }

  private async create_operacion(body: CreateOperationCustom) {
    try {
      const { operation_created } =
        await this.InstalacionesService.createOperacion(body);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: instalacion.elementos?.map((elemento) => {
            return {
              ...elemento,
              operaciones: [...(elemento.operaciones || []), operation_created],
            };
          }),
        };
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Instalación creado correctamente',
      });
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
      });
    }
  }

  async edit_operacion(operacion: InstalacionesOperacioneDto) {
    const fields = get_field_create_or_edit_form_operaciones();

    const model: UpdateOperationCustom = {
      id: operacion.id,
      idEmpresa: operacion.idEmpresa!,
      idElemento: operacion.idElemento!,
      fecha: operacion.fecha!,
      actuante: operacion.actuante,
      frecuencia: operacion.frecuencia!,
      descripcion: this.get_description_operation(operacion),
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Operacion',
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
      const { operation_update } =
        await this.InstalacionesService.editOperacion(data);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: instalacion.elementos?.map((elemento) => {
            return {
              ...elemento,
              operaciones: elemento.operaciones?.map((operacion) => {
                if (operacion.id === operation_update.id) {
                  return { ...operacion, ...operation_update };
                }

                return operacion;
              }),
            };
          }),
        };
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Instalación creado correctamente',
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

  async confirm_delete_operacion(operacion: InstalacionesOperacioneDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar este elemento?',
      header: 'Eliminar fila de instalaciones',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_operacion(operacion);
      },
    });
  }

  async delete_operacion(operacion: InstalacionesOperacioneDto) {
    try {
      await this.InstalacionesService.deleteOperacion(operacion.id!);

      this.instalaciones = this.instalaciones.map((instalacion) => {
        return {
          ...instalacion,
          elementos: instalacion.elementos?.map((_elemento) => {
            return {
              ..._elemento,
              operaciones: _elemento.operaciones?.filter(
                (_operacion) => _operacion.id !== operacion.id
              ),
            };
          }),
        };
      });

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
  }

  get_description_operation(operacion: InstalacionesOperacioneDto): string {
    return get_lang_description(operacion.langs!, LANG_ES);
  }

  export_excel() {
    const data_to_sheet = this.instalaciones.map((instalacion) => {
      return {
        ID: instalacion.id,
        Centro: instalacion?.centro?.nombre,
        Nombre: instalacion.nombre,
        Comentarios: instalacion.comentarios,
      };
    });
    export_data_to_excel(data_to_sheet, 'Instalaciones');
  }
}
