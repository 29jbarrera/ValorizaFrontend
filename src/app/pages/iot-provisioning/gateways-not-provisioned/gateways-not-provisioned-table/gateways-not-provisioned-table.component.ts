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

import { DeviceNotProvisionedDto } from '@valoriza/web-provisioning';
import { GatewaysNotProvisionedService } from '../gateways-not-provisioned.service';
import { get_field_edit_form } from './types';

@Component({
  selector: 'app-gateways-not-provisioned-table',
  templateUrl: './gateways-not-provisioned-table.component.html',
  styleUrls: ['./gateways-not-provisioned-table.component.scss'],
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
  ],
  providers: [ConfirmationService, MessageService],
})
export class GatewaysNotProvisionedTableComponent implements OnInit {
  devices: DeviceNotProvisionedDto[] = [];
  public loading: boolean = true;

  constructor(
    private _gatewaysNotProvisionedService: GatewaysNotProvisionedService,
    private modalController: ModalController,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this._gatewaysNotProvisionedService.get().then((devices) => {
      console.log('devices', devices);
      this.devices = devices;
    }).finally(() => {
      this.loading = false;
    });
  }

  // TODO: no esta claro como se editan estos campos porque falta coherencia con los dto y la pagina de muestra
  async edit(device: DeviceNotProvisionedDto) {
    const fields = get_field_edit_form([]);

    // Setear el modelo
    const model: any = {};

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear',
        role: 'create',
        submit_text: 'Crear',
      },
    });
    await modal.present();

    const { data, role } = await modal.onWillDismiss();
    if (role !== 'create') {
      return;
    }

    try {

      // TODO: Usar el servicio para crear
      const response = await this._gatewaysNotProvisionedService.edit({} as any);

      // TODO: Actualizar la tabla

      // Mostrar mensaje de éxito
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


  // TODO: falta por aclarar los campos de estos modelos.
  get_api(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_tipo_servicio(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_nombre_de_driver(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_identificador_unico(device: DeviceNotProvisionedDto) {
    return device.deviceUniqueId;
  }

  get_nombre_gate_way(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_iot_hub(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_modulo(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_id_origen(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_tipo_origen(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_centro(device: DeviceNotProvisionedDto) {
    return '';
  }

  get_aprovisionado(device: DeviceNotProvisionedDto) {
    return '';
  }
}
