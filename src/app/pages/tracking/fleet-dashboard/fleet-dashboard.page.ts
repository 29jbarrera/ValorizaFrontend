import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fleet-dashboard',
  templateUrl: './fleet-dashboard.page.html',
  styleUrls: ['./fleet-dashboard.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FleetDashboardPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
