import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppParameterDto, UpdateAppParameterDto } from '@valoriza/web-commons';
import { LimiteAvisosService } from '../limite-avisos.service';

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
import { edit_limite_avisos } from './types';
import { CommonTable, ModalFormComponent } from '@valoriza/web-components';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-limite-avisos-table',
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
  ],
  templateUrl: './limite-avisos-table.component.html',
  styleUrl: './limite-avisos-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class LimiteAvisosTableComponent extends CommonTable<AppParameterDto> implements OnInit {

  searchForm: FormGroup;

  constructor(
    private LimiteAvisosService: LimiteAvisosService,
    private fb: FormBuilder,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    public modalController: ModalController
  ) {
    super();
    this.searchForm = this.fb.group({
      code: [''],
      value: [''],
      description: [''],
    });
  }
  ngOnInit() {
    this.updateTable();
  }

  override async get_values(page: number = 1, pageSize: number = 100) {
    return this.LimiteAvisosService.getLimiteAvisos(page, pageSize);
  }

  async edit(limiteAviso: AppParameterDto) {
    // TODO: PETICIÓN A BACKEND PARA EDITAR
    console.error('Edit object:', limiteAviso);

    try {
      const fields = edit_limite_avisos();
      const model: UpdateAppParameterDto = {
        codigo: limiteAviso.codigo!,
        valor: limiteAviso.valor!,
        idEmpresa: limiteAviso.idEmpresa!,
        descripcion: limiteAviso.descripcion,
        id: limiteAviso.id!,
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

      await this.LimiteAvisosService.edit(data);

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Fila actualizada correctamente',
        life: 3000,
      });
      this.updateTable();
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async delete(limiteAviso: AppParameterDto) {
    try {
      await this.LimiteAvisosService.deleteLimiteAvisos(limiteAviso.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.value = this.value.filter(
        (o) => o.id !== limiteAviso.id
      );
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

  async confirm_delete(limiteAviso: AppParameterDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de Límite avisos',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(limiteAviso);
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
}
