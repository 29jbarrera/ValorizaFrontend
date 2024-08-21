import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-fleet-map',
  templateUrl: './fleet-map.page.html',
  styleUrls: ['./fleet-map.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class FleetMapPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
