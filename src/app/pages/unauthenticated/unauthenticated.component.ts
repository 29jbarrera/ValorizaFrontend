import { CommonModule } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { CardModule } from 'primeng/card';
import { LogotypeComponent } from '@valoriza/web-components';

import {
  MSAL_GUARD_CONFIG,
  MsalBroadcastService,
  MsalGuardConfiguration,
  MsalModule,
  MsalService,
} from '@azure/msal-angular';
import {
  AuthenticationResult,
  EventMessage,
  EventType,
  InteractionStatus,
  PopupRequest,
  RedirectRequest,
} from '@azure/msal-browser';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-unauthenticated',
  standalone: true,
  imports: [
    CommonModule,
    MsalModule,
    RouterOutlet,
    RouterLink,
    CardModule,
    LogotypeComponent
  ],
  templateUrl: './unauthenticated.component.html',
  styleUrl: './unauthenticated.component.scss',
})
export class UnauthenticatedComponent implements OnInit, OnDestroy {
  title = 'Angular 17 Sample - MSAL Angular v3';
  isIframe = false;
  loginDisplay = false;
  private readonly _destroying$ = new Subject<void>();

  constructor(
    @Inject(MSAL_GUARD_CONFIG) private msalGuardConfig: MsalGuardConfiguration,
    private authService: MsalService,
    private msalBroadcastService: MsalBroadcastService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.handleRedirectObservable().subscribe();
    this.isIframe = window !== window.parent && !window.opener; // Remove this line to use Angular Universal

    this.setLoginDisplay();

    this.authService.instance.enableAccountStorageEvents(); // Optional - This will enable ACCOUNT_ADDED and ACCOUNT_REMOVED events emitted when a user logs in or out of another tab or window
    this.msalBroadcastService.msalSubject$
      .pipe(
        filter((msg: EventMessage) => {
          console.log('msg', msg);

          return (
            msg.eventType === EventType.ACCOUNT_ADDED ||
            msg.eventType === EventType.ACCOUNT_REMOVED
          );
        })
      )
      .subscribe((result: EventMessage) => {
        console.log('Event Message: ', result);
        if (this.authService.instance.getAllAccounts().length === 0) {
          window.location.pathname = '/';
        } else {
          this.setLoginDisplay();
        }
      });

    this.msalBroadcastService.inProgress$
      .pipe(
        filter(
          (status: InteractionStatus) => status === InteractionStatus.None
        ),
        takeUntil(this._destroying$)
      )
      .subscribe(() => {
        this.setLoginDisplay();
        this.checkAndSetActiveAccount();
      });
  }

  setLoginDisplay() {
    this.loginDisplay = this.authService.instance.getAllAccounts().length > 0;
  }

  checkAndSetActiveAccount() {
    /**
     * If no active account set but there are accounts signed in, sets first account to active account
     * To use active account set here, subscribe to inProgress$ first in your component
     * Note: Basic usage demonstrated. Your app may require more complicated account selection logic
     */
    let activeAccount = this.authService.instance.getActiveAccount();

    if (
      !activeAccount &&
      this.authService.instance.getAllAccounts().length > 0
    ) {
      let accounts = this.authService.instance.getAllAccounts();
      this.authService.instance.setActiveAccount(accounts[0]);
    } else {
      // this.go_to_authenticated();
    }
  }

  loginPopup() {
    if (this.msalGuardConfig.authRequest) {
      this.authService
        .loginPopup({ ...this.msalGuardConfig.authRequest } as PopupRequest)
        .subscribe((response: AuthenticationResult) => {
          console.log('loginPopup', response);
          this.authService.instance.setActiveAccount(response.account);
          this.go_to_authenticated();
        });
    } else {
      this.authService
        .loginPopup()
        .subscribe((response: AuthenticationResult) => {
          this.authService.instance.setActiveAccount(response.account);
          this.go_to_authenticated();
        });
    }
  }

  logout(popup?: boolean) {
    if (popup) {
      this.authService.logoutPopup({
        mainWindowRedirectUri: '/',
      });
    } else {
      this.authService.logoutRedirect();
    }
  }

  ngOnDestroy(): void {
    this._destroying$.next(undefined);
    this._destroying$.complete();
  }

  copy_storage() {
    // Get all keys from localStorage
    const keys = Object.keys(localStorage);
    const storage: any = {};
    keys.forEach((key) => {
      storage[key] = localStorage.getItem(key);
    });
    this.copy_clipoard(JSON.stringify(storage));
  }

  copy_clipoard(texto: string) {
    // Crear un elemento de texto temporal para copiar el contenido
    var elementoTemporal = document.createElement('textarea');
    elementoTemporal.value = texto;

    // Añadir el elemento temporal al cuerpo del documento
    document.body.appendChild(elementoTemporal);

    // Seleccionar el contenido del elemento temporal
    elementoTemporal.select();
    elementoTemporal.setSelectionRange(0, 99999); // Para dispositivos móviles

    // Copiar el contenido seleccionado al portapapeles
    document.execCommand('copy');

    // Remover el elemento temporal del documento
    document.body.removeChild(elementoTemporal);
  }

  go_to_authenticated() {
    this.router.navigate(['authenticated']);
  }
}
