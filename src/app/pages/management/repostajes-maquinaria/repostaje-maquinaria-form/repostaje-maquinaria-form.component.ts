import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-repostaje-maquinaria-form',
  standalone: true,
  imports: [ButtonModule, DropdownModule, InputTextModule, CalendarModule],
  templateUrl: './repostaje-maquinaria-form.component.html',
  styleUrl: './repostaje-maquinaria-form.component.scss',
})
export class RepostajeMaquinariaFormComponent {}
