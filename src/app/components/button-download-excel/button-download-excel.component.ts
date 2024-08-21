import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

/**
 * Default button to download an excel file
 *
 * @export
 * @class ButtonDownloadExcelComponent
 */
@Component({
  selector: 'app-button-download-excel',
  templateUrl: './button-download-excel.component.html',
  styleUrls: ['./button-download-excel.component.scss'],
  standalone: true,
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonDownloadExcelComponent {
  /**
   * Unique identifier for the button
   *
   * @type {string}
   * @memberof ButtonDownloadExcelComponent
   */
  @Input() _id: string = 'export-excel';
  @Output() _click: EventEmitter<any> = new EventEmitter();
}
