import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavigationComponent, MapComponent } from '@valoriza/web-components';

@Component({
  selector: 'app-authenticated',
  standalone: true,
  imports: [RouterOutlet, NavigationComponent, MapComponent],
  templateUrl: './authenticated.component.html',
  styleUrl: './authenticated.component.scss',
})
export class AuthenticatedComponent {}
