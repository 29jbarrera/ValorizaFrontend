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
  selector: 'app-invocation-definitions',
  templateUrl: './invocation-definitions.page.html',
  styleUrls: ['./invocation-definitions.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    HeaderComponent
  ],
})
export class InvocationDefinitionsPage implements OnInit {
  constructor() {}

  ngOnInit() {}
}
