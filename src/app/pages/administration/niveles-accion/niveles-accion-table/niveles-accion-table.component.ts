import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  CreateNivelMantenimientoTiposAccionDto,
  NivelMantenimientoTiposAccionDto,
  NivelMantenimientoTiposAccionDtoView,
  UpdateNivelMantenimientoTiposAccionDto,
} from '@valoriza/web-commons';
import { NivelesAccionService } from '../niveles-accion.service';

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
  ModalFormComponent,
  SearchFormTableComponent,
  ValorizaTypesService,
} from '@valoriza/web-components';
import {
  get_field_create_or_edit_form_niveles_accion,
  get_fields_search_table_niveles_mantenimiento,
} from './types';
import { ButtonCreateComponent } from '../../../../components/button-create/button-create.component';
import { LoadingController, ModalController } from '@ionic/angular/standalone';
@Component({
  selector: 'app-niveles-accion-table',
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
    ButtonCreateComponent,
  ],
  templateUrl: './niveles-accion-table.component.html',
  styleUrl: './niveles-accion-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class NivelesAccionTableComponent
  extends CommonTable<NivelMantenimientoTiposAccionDtoView>
  implements OnInit
{
  grupos: any[] = [];

  override search_model: any = {};
  override search_options: FormlyFormOptions = {};
  override search_fields: FormlyFieldConfig[] = [];

  constructor(
    private NivelesAccionService: NivelesAccionService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private valorizaTypesService: ValorizaTypesService,
    public modalController: ModalController,
    private loadingController: LoadingController
  ) {
    super();
  }

  ngOnInit() {
    this.search_model = {
      accion: undefined,
      grupo: undefined,
    };
    this.load_grupos();
  }

  // TODO: ADD GRUPOS SELECT
  private load_grupos() {
    // this.valorizaTypesService.
    this.search_fields = get_fields_search_table_niveles_mantenimiento(
      this.grupos
    );
    this.search_model = {
      accion: undefined,
      grupo: undefined,
    };
  }

  override async get_values(page: number = 1, pageSize: number = 100) {
    return this.NivelesAccionService.getNivelesAccion(
      page,
      pageSize,
      this.filter
    );
  }

  async edit(nivelAccion: NivelMantenimientoTiposAccionDto) {
    try {
      this.edit(nivelAccion);

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

  async delete(nivelAccion: NivelMantenimientoTiposAccionDto) {
    try {
      await this.NivelesAccionService.deleteNivelesAccion(nivelAccion.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter((o) => o.id !== nivelAccion.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(nivelAccion: NivelMantenimientoTiposAccionDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de Niveles de acción',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(nivelAccion);
      },
    });
  }

  get_accion(value: NivelMantenimientoTiposAccionDto) {
    return `TODO: get_accion`;
  }

  get_grupo(value: NivelMantenimientoTiposAccionDto) {
    return `TODO: get_grupo`;
  }

  async open_modal_to_create() {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    // TODO: ADD GRUPOS
    // const grupos = await this.valorizaTypesService.

    const fields = {};
    get_field_create_or_edit_form_niveles_accion(this.grupos);

    // Setear el modelo
    const model: CreateNivelMantenimientoTiposAccionDto = {
      idTipo: 0,
      idAccion: 0,
      posicion: 0,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear niveles de acción',
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

  private async create(body: CreateNivelMantenimientoTiposAccionDto) {
    try {
      await this.NivelesAccionService.createNivelesAccion(body);

      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Nivel de acción creado correctamente',
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

  async edit_niveles_accion(niveles_accion: NivelMantenimientoTiposAccionDto) {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    // TODO: ADD GRUPOS
    // const grupos = await this.valorizaTypesService.

    const fields = {};
    get_field_create_or_edit_form_niveles_accion(this.grupos);

    const model: UpdateNivelMantenimientoTiposAccionDto = {
      id: niveles_accion.id,
      idTipo: niveles_accion.idTipo,
      idAccion: niveles_accion.idAccion!,
      posicion: niveles_accion.posicion!,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Niveles de acción',
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
      await this.NivelesAccionService.editNivelesAccion(data);
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
}
