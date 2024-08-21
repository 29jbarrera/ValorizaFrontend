import { Component } from '@angular/core';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-niveles-accion-form',
  standalone: true,
  imports: [DropdownModule,InputTextModule, ButtonModule],
  templateUrl: './niveles-accion-form.component.html',
  styleUrl: './niveles-accion-form.component.scss'
})
export class NivelesAccionFormComponent {

}
