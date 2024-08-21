import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-card-information',
  standalone: true,
  imports: [InputTextModule],
  templateUrl: './card-information.component.html',
  styleUrl: './card-information.component.scss'
})
export class CardInformationComponent {
@Input() image: string = '';
@Input() amount: string = '';
@Input() text: string = '';

}
