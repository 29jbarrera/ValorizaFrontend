import { Component } from '@angular/core';

import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { InputMaskModule } from 'primeng/inputmask';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-instalaciones-form',
  standalone: true,
  imports: [InputMaskModule, InputTextModule, InputNumberModule, ButtonModule],
  templateUrl: './instalaciones-form.component.html',
  styleUrl: './instalaciones-form.component.scss',
})
export class InstalacionesFormComponent {}
