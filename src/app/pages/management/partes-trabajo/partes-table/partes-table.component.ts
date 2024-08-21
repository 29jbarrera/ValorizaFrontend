import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PartesService } from '../partes.service';
import {
  CenterDto,
  CentrosCosteDto,
  CreateParteTrabajoDto,
  ParteTrabajoDto,
} from '@valoriza/web-commons';

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
import { ModalController } from '@ionic/angular';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
  CommonTable,
  ModalFormComponent,
  SearchFormTableComponent,
} from '@valoriza/web-components';
import { get_field_create_or_edit_form } from './types';
import { Router } from '@angular/router';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-partes-table',
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
  templateUrl: './partes-table.component.html',
  styleUrl: './partes-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class PartesTableComponent
  extends CommonTable<ParteTrabajoDto>
  implements OnInit
{
  partes: ParteTrabajoDto[] = [];
  delegations: CenterDto[] = [];
  centers: CentrosCosteDto[] = [];

  constructor(
    private PartesService: PartesService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController,
    private router: Router
  ) {
    super();
  }

  ngOnInit() {
    this.updateTable();
    this.getDelegations();
    this.getCenter();
  }

  override async updateTable() {
    this.partes = await this.PartesService.getPartes();
    this.loading = false;
  }

  async getDelegations() {
    this.delegations = await this.PartesService.getDelegations();
  }

  async getCenter() {
    this.centers = await this.PartesService.getCenter();
  }

  async open_modal_to_create() {
    const fields = get_field_create_or_edit_form(
      this.partes,
      this.delegations,
      this.centers
    );

    const model: any = {
      codEstado: '',
      codTipoMantenimiento: '',
      codTipoActuacion: '',
      nombre: '',
      fecha: '',
      fechaAveria: '',
      fechaFinalizacion: '',
      nombreConductor: '',
      descripcionAveria: '',
      trabajoRealizado: '',
      horas: undefined,
      kilometros: undefined,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear un parte de trabajo',
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

  private async create(body: CreateParteTrabajoDto) {
    try {
      await this.PartesService.create(body);
      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Parte creado correctamente',
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

  getEstate(codEstado: string) {
    if (codEstado === 'CER') {
      return 'Cerrada';
    }
    return codEstado;
  }

  viewParteTrabajo(id: number) {
    this.router.navigate(['/authenticated/management/partes-trabajo', id]);
  }

  // async edit(parte: ParteTrabajoDto) {
  //   const fields = get_field_create_or_edit_form(this.partes);

  //   const model: ParteTrabajoDto = {
  //     nombre: parte.nombre,
  //     centro: parte.centro,
  //     trabajoRealizado: parte.trabajoRealizado,
  //     fecha: parte.fecha,

  //   };

  //   const modal = await this.modalController.create({
  //     component: ModalFormComponent,
  //     componentProps: {
  //       fields,
  //       model,
  //       title: 'Editar un parte de trabajo',
  //       role: 'edit',
  //       submit_text: 'Editar',
  //     },
  //   });
  //   await modal.present();

  //   const { data, role } = await modal.onWillDismiss();
  //   if (role !== 'edit') {
  //     return;
  //   }

  //   try {
  //     await this.PartesService.edit(data);
  //     await this.updateTable();
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Confirmado',
  //       detail: 'Elemento actualizado correctamente',
  //       life: 3000,
  //     });
  //   } catch (error) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Algo inesperado ocurrió',
  //       life: 3000,
  //     });
  //   }
  // }

  // async delete(parte: ParteTrabajoDto) {
  //   try {
  //     await this.PartesService.deletePartes(parte.id!);
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Confirmado',
  //       detail: 'Fila eliminada correctamente',
  //       life: 3000,
  //     });
  //     this.partes = this.partes.filter((o) => o.id !== parte.id);
  //   } catch (error) {
  //     this.messageService.add({
  //       severity: 'error',
  //       summary: 'Error',
  //       detail: 'Algo inesperado ocurrió',
  //       life: 3000,
  //     });
  //   }
  // }

  // async confirm_delete(parte: ParteTrabajoDto) {
  //   this._confirmationService.confirm({
  //     message: '¿Estás seguro de que quieres eliminar esta fila?',
  //     header: 'Eliminar fila de partes de trabajo',
  //     icon: 'pi pi-times-circle',
  //     rejectButtonStyleClass: 'p-button-text',
  //     acceptButtonStyleClass: 'p-button-danger',

  //     accept: async () => {
  //       this.delete(parte);
  //     },
  //     reject: () => {
  //       this.messageService.add({
  //         severity: 'info',
  //         summary: 'Cancelado',
  //         detail: 'La acción fue cancelada',
  //         life: 3000,
  //       });
  //     },
  //   });
  // }

  export_excel() {}
}
