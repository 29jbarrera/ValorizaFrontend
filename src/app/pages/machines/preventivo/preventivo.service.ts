import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
// TODO: Import the necessary modules
import {  MaintenanceDto } from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class PreventivoService {
  constructor(
    // private _maintenanceService: MaintenanceService
    )
     {}

  async getPreventivo(): Promise<MaintenanceDto[]> {
    // const response = await lastValueFrom(
      // this._maintenanceService.apiV2MaintenanceGet()
    // );
    // return response.results || [];
    return [];
  }
  async deletePreventivo(preventivoId: number) {
    // await lastValueFrom(
      // this._maintenanceService.apiV2MaintenanceIdDelete(preventivoId)
    // );
  }
}
