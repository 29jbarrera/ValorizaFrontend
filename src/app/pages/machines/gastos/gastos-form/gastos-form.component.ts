import { Component,EventEmitter, Output } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-gastos-form',
  standalone: true,
  imports: [
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    InputGroupAddonModule,
    InputGroupModule,
    ButtonModule,
    DropdownModule,
  ],
  templateUrl: './gastos-form.component.html',
  styleUrl: './gastos-form.component.scss',
})
export class GastosFormComponent {
  @Output() search = new EventEmitter<any>();

  searchForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      centerProvider: [''],
      delegation: [''],
      date: [''],
      provider: [],
      amount: [''],
      currency: [''],
      materialReference: [''],
      descriptionRefMaterial: [''],
      quantity: [''],
      switchableCost: [''],
      description: [''],
      deliveryNote: [''],
      file: [''],
    });
  }

  onSearch() {
    console.log(this.searchForm.value)
    this.search.emit(this.searchForm.value);
  }
}
