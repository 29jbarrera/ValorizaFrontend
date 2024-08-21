import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
} from '@valoriza/web-components';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-table-documentos',
  templateUrl: './table-documentos.component.html',
  styleUrls: ['./table-documentos.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    ButtonModule,
    ButtonCreateAndExportToExcelComponent,
  ],
})
export class TableDocumentosComponent implements OnInit {
  @Input() documentos: any[] = [];

  constructor() {}

  ngOnInit() {}

  open_modal_to_create() {}
  export_excel() {}
}
