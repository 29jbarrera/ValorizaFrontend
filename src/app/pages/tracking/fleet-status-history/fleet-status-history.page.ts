import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fleet-status-history',
  templateUrl: './fleet-status-history.page.html',
  styleUrls: ['./fleet-status-history.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FleetStatusHistoryPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
