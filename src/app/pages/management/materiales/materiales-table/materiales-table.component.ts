import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

// TODO: Import the necessary modules
// import { ReferenciasMaterialeDto } from '@valoriza/web-commons';
type ReferenciasMaterialeDto = any;
import { MaterialesService } from '../materiales.service';

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
import {
  CategoriaDto,
  CreateMarcaReferenciaMaterialDto,
  CreateReferenciaMaterialDto,
  CreateSubFamiliaReferenciaMaterialDto,
  UpdateReferenciaMaterialDto,
} from '@valoriza/web-commons';
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
import { ModalCreateOrEditSubfamilyComponent } from 'src/app/pages/administration/limite-avisos/limite-avisos-table/components/modal-create-or-edit-subfamily/modal-create-or-edit-subfamily.component';
import { ModalController } from '@ionic/angular';
import { get_field_create_or_edit_form_materiales } from './types';
import { ModalCreateOrEditMarcaComponent } from './modal-create-or-edit-marca/modal-create-or-edit-marca.component';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-materiales-table',
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
  templateUrl: './materiales-table.component.html',
  styleUrl: './materiales-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class MaterialesTableComponent
  extends CommonTable<ReferenciasMaterialeDto>
  implements OnInit
{
  materiales: ReferenciasMaterialeDto[] = [];
  public expandedRowsMateriales = {};

  constructor(
    private MaterialesService: MaterialesService,
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
    this.materiales = await this.MaterialesService.getMateriales();
    this.loading = false;
  }

  // TODO: Damian GET CATEGORY BY ID
  async getCategoryByID(id: string) {
    const category = await this.MaterialesService.getCategoryByID(id);

    return this.get_description_category_material(category);
  }

  get_description_category_material(category: CategoriaDto): string {
    return get_lang_description(category.langs!, LANG_ES);
  }

  // MATERIALES
  // TODO: Damian Get ALL Categories
  async open_modal_to_create_material() {
    const categories = await this.MaterialesService.getCategories();

    const fields = get_field_create_or_edit_form_materiales(categories);

    const model: CreateReferenciaMaterialDto = {
      codigoCategoria: '',
      referencia: '',
      descripcion: '',
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Material',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }

    this.create_material(data);
  }

  private async create_material(body: CreateReferenciaMaterialDto) {
    try {
      const response = await this.MaterialesService.createMaterial(body);

      this.materiales.unshift(response);

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Material creado correctamente',
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

  async edit_material(material: ReferenciasMaterialeDto) {
    // TODO: Get ALL Categories
    const categories = await this.MaterialesService.getCategories();

    const fields = get_field_create_or_edit_form_materiales(categories);

    const model: UpdateReferenciaMaterialDto = {
      id: material.id,
      referencia: material.referencia,
      descripcion: material.descripcion,
      codigoCategoria: material.codigoCategoria,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Editar Material',
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
      const response = await this.MaterialesService.editMaterial(data);

      this.materiales = this.materiales.map((_material) => {
        if (_material.id === material.id) {
          return { ..._material, ...response };
        }
        return _material;
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

  async confirm_delete(material: ReferenciasMaterialeDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de materiales',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_material(material);
      },
    });
  }

  async delete_material(material: ReferenciasMaterialeDto) {
    try {
      await this.MaterialesService.deleteMaterial(material.id);

      this.materiales = this.materiales.filter(
        (_material) => _material.id !== material.id
      );

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.materiales = this.materiales.filter((o) => o.id !== material.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  // SUBFAMILIAS
  async open_modal_to_create_subfamilia(idMaterial: number) {
    const subfamilies = await this.MaterialesService.getSubFamilies();

    const modal = await this.modalController.create({
      component: ModalCreateOrEditSubfamilyComponent,
      componentProps: {
        title: 'Selecciona Subfamilia',
        role: 'create',
        submit_text: 'Guardar',
        subfamilies,
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }

    this.create_subfamilia({
      idSubFamilia: data.id,
      idReferencia: idMaterial,
    });
  }

  async create_subfamilia(data: CreateSubFamiliaReferenciaMaterialDto) {
    console.error('TODO: Crear Subfamilia');
    try {
      const response = await this.MaterialesService.createSubFamilia(data);

      this.materiales = this.materiales.map((material) => {
        if (material.id === data.idReferencia) {
          return {
            ...material,
            subFamiliaReferenciaMateriales: [
              ...material.subFamiliaReferenciaMateriales,
              response,
            ],
          };
        }
        return material;
      });

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Subfamilia creada correctamente',
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

  // MARCAS
  async open_modal_to_create_marca(material: ReferenciasMaterialeDto) {
    const marcas = (await this.MaterialesService.getMarcas()).filter(
      (marca) =>
        !material.marcaReferenciaMateriales.some(
          (ref: any) => ref.idMarca === marca.id
        )
    );

    const modal = await this.modalController.create({
      component: ModalCreateOrEditMarcaComponent,
      componentProps: {
        title: 'Selecciona Marca',
        role: 'create',
        submit_text: 'Guardar',
        marcas,
      },
    });

    await modal.present();

    const { data, role } = await modal.onWillDismiss();

    if (role !== 'create') {
      return;
    }

    const body: CreateMarcaReferenciaMaterialDto = {
      idMarca: data,
      idReferencia: material.id,
    };

    this.create_marca(body);
  }

  async create_marca(body: CreateMarcaReferenciaMaterialDto) {
    try {
      const response = await this.MaterialesService.createMarca(body);

      this.updateTable();

      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Material creado correctamente',
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

  async confirm_delete_marca(marcaID: number) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de materiales',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete_marca(marcaID);
      },
    });
  }

  async delete_marca(marcaID: number) {
    try {
      await this.MaterialesService.deleteMarca(marcaID);

      this.materiales = this.materiales.map((material) => {
        return {
          ...material,
          marcaReferenciaMateriales: material.marcaReferenciaMateriales.filter(
            (marca: any) => marca.id !== marcaID
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

  export_excel() {
    const data_to_sheet = this.materiales.map((material) => {
      return {
        ['Codigo Categoria']: material.codigoCategoria,
        Descripcion: material.descripcion,
      };
    });
    export_data_to_excel(data_to_sheet, 'Materiales');
  }
}
