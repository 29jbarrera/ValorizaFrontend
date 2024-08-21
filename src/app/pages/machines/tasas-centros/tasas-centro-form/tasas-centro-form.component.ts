import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-tasas-centro-form',
  standalone: true,
  imports: [DropdownModule, InputTextModule, CalendarModule],
  templateUrl: './tasas-centro-form.component.html',
  styleUrl: './tasas-centro-form.component.scss',
})
export class TasasCentroFormComponent {}
