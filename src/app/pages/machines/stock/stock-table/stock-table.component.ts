import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { StockService } from '../stock.service';
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
import { StockDto } from '@valoriza/web-commons';
import { ProgressBarModule } from 'primeng/progressbar';
import { export_data_to_excel } from '@valoriza/web-components';
import { ButtonDownloadExcelComponent } from '../../../../components/button-download-excel/button-download-excel.component';

@Component({
  selector: 'app-stock-table',
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
    ButtonDownloadExcelComponent,
  ],
  templateUrl: './stock-table.component.html',
  styleUrl: './stock-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class StockTableComponent implements OnInit {
  @Input() stock: StockDto[] = [];
  public loading: boolean = true;

  form = new FormGroup({});
  model = { email: '' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
    },
  ];
  constructor(
    private StockService: StockService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit() {
    this.updateTable();
  }

  async updateTable() {
    this.stock = await this.StockService.getStock();
    this.loading = false;
  }

  submit() {
    if (this.form.valid) {
      console.log(this.model);
    }
  }

  async edit(stock: StockDto) {
    try {
      this.edit(stock);

      this.messageService.add({
        severity: 'success',
        summary: 'Actualizado',
        detail: 'Fila actualizada correctamente',
        life: 3000,
      });
      this.stock = this.stock.filter((o) => o.id !== stock.id);
    } catch (error) {
      this.messageService.add({
        severity: 'error',
        summary: 'Error',
        detail: 'Algo inesperado ocurrió',
        life: 3000,
      });
    }
  }

  async delete(stock: StockDto) {
    try {
      await this.StockService.deleteStock(stock.id!);
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

  async confirm_delete(stock: StockDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de stock',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(stock);
      },
    });
  }

  export_excel() {
    const data_to_sheet = this.stock.map((stock) => {
      return {
        Nombre_centro: stock.centro?.grupoCentro?.nombre,
        Nombre_referencia_material: stock.referenciaMaterial?.codigoCategoria,
        Descripción_referencia_material: stock.referenciaMaterial?.descripcion,
        Cantidad: stock.cantidad,
        Importe: stock.valor,
        Divisa: stock.codMoneda,
      };
    });
    export_data_to_excel(data_to_sheet, 'Stock');
  }
}
