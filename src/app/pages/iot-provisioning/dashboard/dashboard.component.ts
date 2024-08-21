import { Component } from '@angular/core';
import {
  CardInformationComponent,
  CardListComponent,
} from '@valoriza/web-components';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CardInformationComponent, CardListComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  dates = [
    {
      text: 'Texto 1',
      date: '2024-05-16',
      icon: '../../../assets/images/tickVerde.png',
    },
    { text: 'Texto 2', date: null, icon: null },
    {
      text: 'Texto 3',
      date: '2024-05-18',
      icon: '../../../assets/images/cruzRoja.png',
    },
  ];
  dataUltimaEjecucion = [
    {
      text: 'Movisat Tenerife',
      date: '15/05/2024 20:44:12',
      icon: '../../../assets/images/tickVerde.png',
    },
    {
      text: 'Movisat Villanueva del Pardillo',
      date: '2/11/2024 18:00:16',
      icon: '../../../assets/images/cruzRoja.png',
    },
    {
      text: 'Texto 3',
      date: '2024-05-18',
      icon: '../../../assets/images/cruzRoja.png',
    },
  ];
}
