import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  MaquinariasReparacionesService,
  ReparacionDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class ReparacionesService {
  constructor(private _reparacioneService: MaquinariasReparacionesService) {}

  async getReparaciones(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._reparacioneService.apiV2ReparacionesGet(
        undefined,
        undefined,
        page,
        perPage
      )
    );
    return response;
  }
  async deleteReparaciones(reparacionesId: number) {
    await lastValueFrom(
      this._reparacioneService.apiV2ReparacionesIdDelete(reparacionesId)
    );
  }
}
