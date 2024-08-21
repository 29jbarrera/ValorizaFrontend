import { Component } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { TreeSelectModule } from 'primeng/treeselect';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-preventivo-form',
  standalone: true,
  imports: [
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    TreeSelectModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    DropdownModule
  ],
  templateUrl: './preventivo-form.component.html',
  styleUrl: './preventivo-form.component.scss',
})
export class PreventivoFormComponent {
  time: Date[] | undefined;
}
