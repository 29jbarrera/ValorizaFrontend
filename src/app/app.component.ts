import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import { InputTextModule } from 'primeng/inputtext';
import { RippleModule } from 'primeng/ripple';
import { BadgeModule } from 'primeng/badge';
import { ButtonModule } from 'primeng/button';
import { DocComponent } from './doc/doc.component';
import {
  HeaderComponent,
  LogotypeComponent,
  MenuComponent,
  NavigationComponent,
  MapComponent,
} from '@valoriza/web-components';
import { IonicModule } from '@ionic/angular';
import { StyleClassModule } from 'primeng/styleclass';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterModule,
    RouterOutlet,
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    RippleModule,
    InputTextModule,
    BadgeModule,
    StyleClassModule,
    ButtonModule,
    // MenuModule,
    // DashboardRoutingModule,
    // BlockViewerModule
    DocComponent,
    LogotypeComponent,
    MenuComponent,
    NavigationComponent,
    MapComponent,
    HeaderComponent,
    ReactiveFormsModule,
    IonicModule,
    //
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'app-tablas';
}
