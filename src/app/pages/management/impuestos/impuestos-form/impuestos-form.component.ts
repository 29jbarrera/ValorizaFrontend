import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-impuestos-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './impuestos-form.component.html',
  styleUrl: './impuestos-form.component.scss',
})
export class ImpuestosFormComponent {}
