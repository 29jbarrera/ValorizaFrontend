import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-home-data-item',
  standalone: true,
  imports: [InputTextModule, CommonModule],
  templateUrl: './home-data-item.component.html',
  styleUrl: './home-data-item.component.scss'
})
export class HomeDataItemComponent {
@Input() icon: string = '';
@Input() title: string = '';
@Input() description: string = '';
}
