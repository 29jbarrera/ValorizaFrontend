import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
} from '@ionic/angular/standalone';
import { HeaderComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-gateways',
  templateUrl: './gateways.page.html',
  styleUrls: ['./gateways.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
  ],
})
export class GatewaysPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
