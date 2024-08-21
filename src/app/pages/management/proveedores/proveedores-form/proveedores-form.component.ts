import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-proveedores-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule],
  templateUrl: './proveedores-form.component.html',
  styleUrl: './proveedores-form.component.scss'
})
export class ProveedoresFormComponent {

}
