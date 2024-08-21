import { Component, Inject } from '@angular/core';
import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalService,
} from '@azure/msal-angular';

@Component({
  selector: 'app-doc',
  standalone: true,
  imports: [],
  templateUrl: './doc.component.html',
  styleUrl: './doc.component.scss',
})
export class DocComponent {
  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService
  ) {}

  logout() {
    this.authService.logout();
  }
}
