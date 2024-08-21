import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  NO_ERRORS_SCHEMA,
  OnInit,
} from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import {} from '@ngx-formly/primeng';
import { FieldType, FormlyFieldProps } from '@ngx-formly/core';
import { SelectItem } from 'primeng/api';

@Component({
  selector: 'app-select-with-filter',
  templateUrl: './select-with-filter.component.html',
  styleUrls: ['./select-with-filter.component.scss'],
  standalone: true,
  imports: [DropdownModule, CommonModule, ReactiveFormsModule, FormsModule],
  schemas: [NO_ERRORS_SCHEMA],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SelectWithFilterComponent extends FieldType implements OnInit {
  override defaultOptions = {
    templateOptions: {
      options: [] as SelectItem[],
      placeholder: 'Select...',
    },
  };
  override get props(): FormlyFieldProps & {
    options: SelectItem[];
  } & { [additionalProperties: string]: any } {
    return this.field.props as any;
  }

  ngOnInit() {}

  // Getter para formControl con el tipo adecuado
  override get formControl(): FormControl {
    return this.form.get(this.field.key as string) as FormControl;
  }
}
