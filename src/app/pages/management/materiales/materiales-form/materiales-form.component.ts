import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-materiales-form',
  standalone: true,
  imports: [DropdownModule, ButtonModule, InputTextModule],
  templateUrl: './materiales-form.component.html',
  styleUrl: './materiales-form.component.scss'
})
export class MaterialesFormComponent {

}
