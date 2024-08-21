import { Component, Input, OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';

@Component({
  selector: 'app-divider',

  templateUrl: './divider.component.html',
  styleUrls: ['./divider.component.scss'],
  standalone: true,
  imports: [DividerModule],
})
export class DividerComponent implements OnInit {

  @Input() title: string = '';
  @Input() icon: string = '';
  
  constructor() {}

  ngOnInit() {}
}
