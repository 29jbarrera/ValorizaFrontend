import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';

/**
 * Default button to create a new item
 *
 * @export
 * @class ButtonCreateComponent
 */
@Component({
  selector: 'app-button-create',
  templateUrl: './button-create.component.html',
  styleUrls: ['./button-create.component.scss'],
  standalone: true,
  imports: [ButtonModule],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonCreateComponent {
  /**
   * Unique identifier for the button
   *
   * @type {string}
   * @memberof ButtonCreateComponent
   */
  @Input() _id: string = 'create';
  @Output() _click: EventEmitter<any> = new EventEmitter();
}
