import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-depositos-form',
  standalone: true,
  imports: [ButtonModule, InputTextModule],
  templateUrl: './depositos-form.component.html',
  styleUrl: './depositos-form.component.scss',
})
export class DepositosFormComponent {}
