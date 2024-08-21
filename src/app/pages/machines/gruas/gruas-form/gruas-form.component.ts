import { Component } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';

@Component({
  selector: 'app-gruas-form',
  standalone: true,
  imports: [
    InputMaskModule,
    InputNumberModule,
    InputTextModule,
    CalendarModule,
    DropdownModule
  ],
  templateUrl: './gruas-form.component.html',
  styleUrl: './gruas-form.component.scss',
})
export class GruasFormComponent {}
