import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, ReactiveFormsModule } from '@angular/forms';
import {
  FormlyFieldConfig,
  FormlyFormOptions,
  FormlyModule,
} from '@ngx-formly/core';
import { FormlyPrimeNGModule } from '@ngx-formly/primeng';
import { AccordionModule } from 'primeng/accordion';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-search-form-table',
  templateUrl: './search-form-table.component.html',
  styleUrls: ['./search-form-table.component.scss'],
  standalone: true,
  imports: [
    AccordionModule,
    FormlyModule,
    FormlyPrimeNGModule,
    ReactiveFormsModule,
    ButtonModule,
  ],
})
export class SearchFormTableComponent implements OnInit {
  form = new FormGroup<any>({});

  @Input() title: string = '';
  @Input() search_model: any = {};
  @Input() search_options: FormlyFormOptions = {};
  @Input() search_fields: FormlyFieldConfig[] = [];

  @Output() search = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  clean_filters() {
    console.error('TODO: Limpiar Filtros');
  }

  search_with_filters() {
    if (this.form.invalid) {
      Object.keys(this.form.controls).forEach((key: string) => {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].markAsTouched();
      });
      return;
    }
    this.search.emit(this.search_model);
  }
}
