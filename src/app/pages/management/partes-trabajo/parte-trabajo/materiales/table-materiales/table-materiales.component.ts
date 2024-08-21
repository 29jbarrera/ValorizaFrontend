import { Component, Input, OnInit } from '@angular/core';
import {
  ButtonCreateComponent,
  ButtonDownloadExcelComponent,
} from '@valoriza/web-components';
import { TableModule } from 'primeng/table';
import { ButtonCreateAndExportToExcelComponent } from 'src/app/components/button-create-and-export-to-excel/button-create-and-export-to-excel.component';

@Component({
  selector: 'app-table-materiales',
  templateUrl: './table-materiales.component.html',
  styleUrls: ['./table-materiales.component.scss'],
  standalone: true,
  imports: [
    TableModule,
    ButtonCreateComponent,
    ButtonDownloadExcelComponent,
    ButtonCreateAndExportToExcelComponent,
  ],
})
export class TableMaterialesComponent implements OnInit {
  @Input() materiales: any[] = [];

  constructor() {}

  ngOnInit() {}

  open_modal_to_create() {}
  export_excel() {}
}
