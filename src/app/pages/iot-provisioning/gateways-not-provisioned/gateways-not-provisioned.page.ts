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
import { GatewaysNotProvisionedTableComponent } from './gateways-not-provisioned-table/gateways-not-provisioned-table.component';

@Component({
  selector: 'app-gateways-not-provisioned',
  templateUrl: './gateways-not-provisioned.page.html',
  styleUrls: ['./gateways-not-provisioned.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent,
    GatewaysNotProvisionedTableComponent
  ],
})
export class GatewaysNotProvisionedPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
