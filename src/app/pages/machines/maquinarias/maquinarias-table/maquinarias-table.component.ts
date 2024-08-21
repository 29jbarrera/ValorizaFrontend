import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaquinariaDto, SubFamiliaDto } from '@valoriza/web-commons';
import {
  export_data_to_excel,
  get_lang_description,
  LANG_ES,
  SearchFormTableComponent,
  SelectorType,
} from '@valoriza/web-components';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ProgressBarModule } from 'primeng/progressbar';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { MaquinariaService } from '../maquinarias.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { get_fields_search_table_maquinaria } from './types';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-maquinaria-table',
  templateUrl: './maquinarias-table.component.html',
  styleUrls: ['./maquinarias-table.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    CommonModule,
    ConfirmDialogModule,
    ToastModule,
    ProgressBarModule,
    ButtonCreateAndExportToExcelComponent,
    SearchFormTableComponent,
  ],
  providers: [ConfirmationService, MessageService],
})
export class MaquinariaTableComponent implements OnInit {
  maquinarias: MaquinariaDto[] = [];
  loading: boolean = true;

  servicios: SelectorType[] = [];
  centros: SelectorType[] = [];
  seguros: SelectorType[] = [];
  estados_maquinaria: SelectorType[] = [];
  familias: SelectorType[] = [];
  
  search_model: any = {};
  search_options: FormlyFormOptions = {};
  search_fields: FormlyFieldConfig[] = [];

  constructor(
    private MaquinariaService: MaquinariaService,
    private _confirmationService: ConfirmationService,
    private _messageService: MessageService,
    private _router: Router
  ) {}

  ngOnInit() {
    this.getMaquinarias();

    this.search_model = {
      matricula: '',
      bastidor: '',
      servicio: '',
      delegacion: '',
      centro: '',
      seguro: '',
      codEstadoMaquinaria: '',
      idFamilia: null,
    };

    this.search_fields = get_fields_search_table_maquinaria(
      this.servicios,
      this.centros,
      this.seguros,
      this.estados_maquinaria,
      this.familias
    );
  }

  async search(model: any){
    console.error('TODO: Filtros', model)
  }

  async getMaquinarias() {
    this.maquinarias = await this.MaquinariaService.getMaquinarias();
    this.loading = false;
  }

  get_description_subfamily(subfamily: SubFamiliaDto): string {
    return get_lang_description(subfamily.langs!, LANG_ES);
  }

  go_to_maquinaria(id: number) {
    this._router.navigate(['authenticated', 'machines', 'maquinarias', id]);
  }

  create_maquinaria() {
    console.error('TODO: Crear Maquinaria');
  }

  export_excel() {
    console.error('TODO: Exportar a Excel');
    // const data_to_sheet = this.maquinarias.map((maquinaria) => {
    //   return {
    //     ...maquinaria,
    //   };
    // });
    // export_data_to_excel(data_to_sheet, 'Maquinarias');
  }
}
