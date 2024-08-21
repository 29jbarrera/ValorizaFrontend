import { Component } from '@angular/core';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-cambio-centro-form',
  standalone: true,
  imports: [InputNumberModule, InputTextModule, ButtonModule],
  templateUrl: './cambio-centro-form.component.html',
  styleUrl: './cambio-centro-form.component.scss'
})
export class CambioCentroFormComponent {

}
