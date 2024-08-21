import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ChasisDto } from '@valoriza/web-commons';
import { format_price_amount } from '@valoriza/web-components';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-tabla-chasis',
  templateUrl: './tabla-chasis.component.html',
  styleUrls: ['./tabla-chasis.component.scss'],
  standalone: true,
  imports: [CommonModule, TableModule]
})
export class TablaChasisComponent  implements OnInit {

  @Input() chasis: ChasisDto | undefined;

  constructor() { }

  ngOnInit() {}

  format_price_amount(amount: number) {
    return format_price_amount(amount);
  }

}
