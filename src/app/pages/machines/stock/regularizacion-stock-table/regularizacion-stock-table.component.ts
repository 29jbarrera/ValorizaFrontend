import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormlyModule } from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import {
  CreatePrestamosStockDto,
  RegulacionesStockDto,
} from '@valoriza/web-commons';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import {
  ButtonCreateComponent,
  ModalFormComponent,
} from '@valoriza/web-components';
import { LoadingController } from '@ionic/angular';
import { StockService } from '../stock.service';
import { ModalController } from '@ionic/angular/standalone';
import { get_field_create_form_regularizacion_stock } from './types';

@Component({
  selector: 'app-regularizacion-stock-table',
  standalone: true,
  imports: [
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    CommonModule,
    ProgressBarModule,
    ReactiveFormsModule,
    FormlyPrimeNGModule,
    ConfirmDialogModule,
    ToastModule,
    ButtonModule,
    FormsModule,
    FormlyModule,
    ButtonCreateComponent,
  ],
  templateUrl: './regularizacion-stock-table.component.html',
  styleUrls: ['./regularizacion-stock-table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class RegularizacionStockTableComponent {
  public regularizacionesStock: RegulacionesStockDto[] = [];
  public loading: boolean = true;
  constructor(
    private messageService: MessageService,
    private loadingController: LoadingController,
    private StockService: StockService,
    private modalController: ModalController
  ) {}

  ngOnInit() {
    this.updateTable();
  }

  async updateTable() {
    this.regularizacionesStock =
      await this.StockService.getRegularizacionStock();
    this.loading = false;
  }

  // TODO: ADD CORRECT TYPE OF DATA TO CREATE
  async open_modal_to_create() {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const centros = await this.StockService.getCentros();
    const refrenciaMateriales =
      await this.StockService.getReferenciaMateriales();

    const fields = get_field_create_form_regularizacion_stock(
      centros,
      refrenciaMateriales
    );

    const model: CreatePrestamosStockDto = {
      codMoneda: '',
      cantidad: 0,
      valor: 0,
      idReferenciaMaterial: 0,
      idCentroDestino: 0,
      idCentroOrigen: 0,
    };

    const modal = await this.modalController.create({
      component: ModalFormComponent,
      componentProps: {
        fields,
        model,
        title: 'Crear Regularización Stock',
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

  private async create(body: CreatePrestamosStockDto) {
    try {
      await this.StockService.createPrestamosStock(body);
      this.updateTable();
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Regularización stock creada correctamente',
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
