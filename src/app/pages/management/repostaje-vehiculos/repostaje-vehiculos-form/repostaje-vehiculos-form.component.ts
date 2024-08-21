import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-repostaje-vehiculos-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule, CalendarModule],
  templateUrl: './repostaje-vehiculos-form.component.html',
  styleUrl: './repostaje-vehiculos-form.component.scss'
})
export class RepostajeVehiculosFormComponent {

}
