import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
} from '@valoriza/web-components';
import { TableModule } from 'primeng/table';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-table-mecanicos',
  templateUrl: './table-mecanicos.component.html',
  styleUrls: ['./table-mecanicos.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
})
export class TableMecanicosComponent implements OnInit {
  @Input() mecanicos: any[] = [];

  constructor() {}

  ngOnInit() {}

  open_modal_to_create() {}
  export_excel() {}
}
