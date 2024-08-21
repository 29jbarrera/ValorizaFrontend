import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';

@Component({
  selector: 'app-iot-hub',
  templateUrl: './iot-hub.page.html',
  styleUrls: ['./iot-hub.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class IotHubPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
