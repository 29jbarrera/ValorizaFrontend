import { Component } from '@angular/core';

import { HeaderComponent } from '@valoriza/web-components';
import { StockFormComponent } from './stock-form/stock-form.component';
import { StockTableComponent } from './stock-table/stock-table.component';
import { PrestamosStockTableComponent } from './prestamos-stock-table/prestamos-stock-table.component';
import { TabViewModule } from 'primeng/tabview';
import { RegularizacionStockTableComponent } from './regularizacion-stock-table/regularizacion-stock-table.component';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [
    StockFormComponent,
    StockTableComponent,
    RegularizacionStockTableComponent,
    PrestamosStockTableComponent,
    HeaderComponent,
    TabViewModule,
  ],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.scss',
})
export class StockComponent {}
