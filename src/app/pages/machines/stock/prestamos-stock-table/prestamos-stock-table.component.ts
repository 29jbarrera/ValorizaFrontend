import { Component, OnInit } from '@angular/core';
import {
  CreatePrestamosStockDto,
  PrestamosStockDto,
  StockDto,
} from '@valoriza/web-commons';
import { TableModule } from 'primeng/table';
import { ButtonCreateComponent } from '../../../../components/button-create/button-create.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { StockService } from '../stock.service';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';
import {
  export_data_to_excel,
  ModalFormComponent,
} from '@valoriza/web-components';
import { ModalController, LoadingController } from '@ionic/angular/standalone';
import { get_field_create_form_prestamos_stock } from './types';

@Component({
  selector: 'app-prestamos-stock-table',
  standalone: true,
  imports: [
    TableModule,
    ButtonCreateComponent,
    ConfirmDialogModule,
    ToastModule,
    ButtonDownloadExcelComponent,
  ],
  templateUrl: './prestamos-stock-table.component.html',
  styleUrls: ['./prestamos-stock-table.component.scss'],
  providers: [ConfirmationService, MessageService],
})
export class PrestamosStockTableComponent implements OnInit {
  prestamosStock: PrestamosStockDto[] = [];
  public loading: boolean = true;

  constructor(
    private StockService: StockService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService,
    private modalController: ModalController,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.updateTable();
  }

  async updateTable() {
    this.prestamosStock = await this.StockService.getPrestamosStock();
    this.loading = false;
  }

  // TODO: ADD ID CENTRO ORIGEN
  async open_modal_to_create() {
    const loading = await this.loadingController.create({
      backdropDismiss: false,
      mode: 'ios',
      spinner: 'dots',
      duration: 0,
    });

    await loading.present();

    const centros_destino = await this.StockService.getCentros();
    const centros_origen = await this.StockService.getCentros();

    const refrenciaMateriales =
      await this.StockService.getReferenciaMateriales();

    const fields = get_field_create_form_prestamos_stock(
      centros_destino,
      centros_origen,
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
        detail: 'Préstamos stock creado correctamente',
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

  async confirm_delete(prestamosStock: PrestamosStockDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de préstamos stock',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(prestamosStock);
      },
    });
  }

  async delete(prestamosStock: PrestamosStockDto) {
    try {
      await this.StockService.deletePrestamosStock(prestamosStock.id!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Elemento eliminado correctamente',
        life: 3000,
      });
      this.prestamosStock = this.prestamosStock.filter(
        (o) => o.id !== prestamosStock.id
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

  // TODO: ADD NOMBRE_REF_MATERIAL , DESCRIPCION_REF_MATERIAL
  export_excel() {
    const data_to_sheet = this.prestamosStock.map((prestamo) => {
      return {
        Centro_origen: prestamo?.centroOrigen?.grupoCentro?.nombre,
        Centro_destino: prestamo.centroDestino?.nombre,
        Nombre_referencia_material: '',
        Descripción_referencia_material: '',
        Cantidad: prestamo.cantidad,
      };
    });
    export_data_to_excel(data_to_sheet, 'Préstamos Stock');
  }
}
