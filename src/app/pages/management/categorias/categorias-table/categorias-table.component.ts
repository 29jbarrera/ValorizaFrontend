import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { CategoriasService } from '../categorias.service';

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
import { CategoriaDto } from '@valoriza/web-commons';
import {
  ButtonDownloadExcelComponent,
  CommonTable,
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
} from '@valoriza/web-components';

@Component({
  selector: 'app-categorias-table',
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
  templateUrl: './categorias-table.component.html',
  styleUrl: './categorias-table.component.scss',
  providers: [ConfirmationService, MessageService],
})
export class CategoriasTableComponent
  extends CommonTable<CategoriaDto>
  implements OnInit
{
  categorias: CategoriaDto[] = [];

  constructor(
    private CategoriasService: CategoriasService,
    private _confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {
    super();
  }
  ngOnInit() {
    this.updateTable();
  }

  override async updateTable(page: number = 1, perPage: number = 100) {
    this.loading = true;
    const response = await this.CategoriasService.getCategorias(page, perPage);
    this.categorias = response.results || [];
    this.totalRecords = response.total || 0;
    this.loading = false;
  }

  // async edit(categoria: CategoriaDto) {

  //   try{
  //     this.messageService.add({
  //       severity: 'success',
  //       summary: 'Actualizado',
  //       detail: 'Fila actualizada correctamente',
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

  async delete(categoria: CategoriaDto) {
    try {
      await this.CategoriasService.deleteCategorias(categoria.codigo!);
      this.messageService.add({
        severity: 'success',
        summary: 'Confirmado',
        detail: 'Fila eliminada correctamente',
        life: 3000,
      });
      this.categorias = this.categorias.filter(
        (o) => o.codigo !== categoria.codigo
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

  async confirm_delete(categoria: CategoriaDto) {
    this._confirmationService.confirm({
      message: '¿Estás seguro de que quieres eliminar esta fila?',
      header: 'Eliminar fila de categorías',
      icon: 'pi pi-times-circle',
      rejectButtonStyleClass: 'p-button-text',
      acceptButtonStyleClass: 'p-button-danger',

      accept: async () => {
        this.delete(categoria);
      },
    });
  }

  get_category_descripcion(categoria: CategoriaDto): string {
    return get_lang_description(categoria.langs!, LANG_ES);
  }

  export_excel() {
    const data_to_sheet = this.categorias.map((categoria) => {
      return {
        Descripción: this.get_category_descripcion(categoria),
        Código: categoria.codigo,
      };
    });
    export_data_to_excel(data_to_sheet, 'Categorias');
  }
}
