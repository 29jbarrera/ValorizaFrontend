import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import {
  CreateUnidadMedidaTiposCombustibleDto,
  UnidadMedidaTiposCombustibleDto,
  ValorizaTypeDto,
} from '@valoriza/web-commons';
import { UnidadesService } from '../unidades.service';

import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { HttpClientModule } from '@angular/common/http';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { DropdownModule } from 'primeng/dropdown';
import { FormlyFieldConfig, FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ProgressBarModule } from 'primeng/progressbar';
import { IonicModule } from '@ionic/angular';
import { ModalController } from '@ionic/angular';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  ModalFormComponent,
} from '@valoriza/web-components';
import { get_field_create_or_edit_form } from './types';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-unidades-table',
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
    IonicModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    ButtonCreateAndExportToExcelComponent
  ],
  templateUrl: './unidades-table.component.html',
  styleUrl: './unidades-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class UnidadesTableComponent implements OnInit {
  unidades: UnidadMedidaTiposCombustibleDto[] = [];
  searchForm: FormGroup;
  public loading: boolean = true;
  private combustibles: ValorizaTypeDto[] = [];

  constructor(
    private UnidadesService: UnidadesService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    this.searchForm = this.fb.group({
      fuelType: [''],
      units: [''],
      symbol: [''],
    });
  }

  ngOnInit() {
    this.updateTable();
    this.loadCombustibleTypes();
  }

  async updateTable() {
    this.unidades = await this.UnidadesService.getUnidades();
    this.loading = false;
  }

  async loadCombustibleTypes() {
    this.combustibles = await this.UnidadesService.getTiposCombustible();
  }

  async edit(unidad: UnidadMedidaTiposCombustibleDto) {
    const { combustibles, unidades } =
      await this.UnidadesService.getDataToCreate();
    const fields = get_field_create_or_edit_form(combustibles, unidades);

    const model: UnidadMedidaTiposCombustibleDto = {
      codTipoCombustible: unidad.codTipoCombustible,
      idUnidadesMedida: unidad.idUnidadesMedida,
      id: unidad.id!,
      idEmpresa: unidad.idEmpresa!,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar una unidad',
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
      await this.UnidadesService.edit(data);
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

  async delete(unidad: UnidadMedidaTiposCombustibleDto) {
    try {
      await this.UnidadesService.deleteUnidad(unidad.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.unidades = this.unidades.filter((o) => o.id !== unidad.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async confirm_delete(unidad: UnidadMedidaTiposCombustibleDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de unidades',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(unidad);
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

  get_combustible_type(code: string) {
    return this.combustibles.find(
      (combustible) => combustible.codigoCombustible === code
    )?.combustible;
  }

  get_description(unidad: UnidadMedidaTiposCombustibleDto): string {
    return get_lang_description(unidad.unidadesMedida!.langs!, LANG_ES);
  }

  get_abreviatura(unidad: UnidadMedidaTiposCombustibleDto): string {
    return unidad.unidadesMedida!.abreviatura || '';
  }

  async open_modal_to_create() {
    const { combustibles, unidades } =
      await this.UnidadesService.getDataToCreate();
    const fields = get_field_create_or_edit_form(combustibles, unidades);

    const model: any = {
      // Sin combustible
      codTipoCombustible: '',
      // KG
      idUnidadesMedida: undefined,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear una unidad',
        role: 'create_unit',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create_unit') {
      return;
    }
    await this.create(data);
  }

  private async create(body: CreateUnidadMedidaTiposCombustibleDto) {
    try {
      await this.UnidadesService.create(body);

      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Unidad creada correctamente',
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
    const data_to_sheet = this.unidades.map((unidad) => {
      return {
        'Tipo combustible': this.get_combustible_type(
          unidad.codTipoCombustible!
        ),
        Unidades: this.get_description(unidad),
        Símbolo: this.get_abreviatura(unidad),
      };
    });
    export_data_to_excel(data_to_sheet, 'Unidades');
  }
}
