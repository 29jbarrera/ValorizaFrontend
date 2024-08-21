import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonCreateComponent } from '../button-create/button-create.component';
import { ButtonDownloadExcelComponent } from '../button-download-excel/button-download-excel.component';

@Component({
  selector: 'app-button-create-and-export-to-excel',
  templateUrl: './button-create-and-export-to-excel.component.html',
  styleUrls: ['./button-create-and-export-to-excel.component.scss'],
  standalone: true,
  imports: [CommonModule, ButtonCreateComponent, ButtonDownloadExcelComponent],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCreateAndExportToExcelComponent{
  @Input() id_create: string = '';
  @Input() id_export_excel: string = '';

  @Output() click_to_create = new EventEmitter();
  @Output() click_to_excel = new EventEmitter();
}
