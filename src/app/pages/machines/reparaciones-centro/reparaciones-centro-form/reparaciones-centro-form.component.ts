import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-reparaciones-centro-form',
  standalone: true,
  imports: [ButtonModule, DropdownModule, InputTextModule, CalendarModule],
  templateUrl: './reparaciones-centro-form.component.html',
  styleUrl: './reparaciones-centro-form.component.scss',
})
export class ReparacionesCentroFormComponent {}
