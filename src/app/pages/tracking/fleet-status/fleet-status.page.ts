import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fleet-status',
  templateUrl: './fleet-status.page.html',
  styleUrls: ['./fleet-status.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FleetStatusPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
