import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { HomeDataItemComponent } from '../home-data-item/home-data-item.component';


@Component({
  selector: 'app-home-data-group',
  standalone: true,
  imports: [InputTextModule, CommonModule, HomeDataItemComponent],
  templateUrl: './home-data-group.component.html',
  styleUrl: './home-data-group.component.scss',
})
export class HomeDataGroupComponent {
  @Input() title: string = '';
  @Input() data: { icon: string, title: string, description: string }[] = [];
}
