import { Injectable } from '@angular/core';

import { GastoTallerDto, GastosTallerService } from '@valoriza/web-commons';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GastosService {
  constructor(private _gastosTallerService: GastosTallerService) {}

  async getGastos(page: number, pageSize: number) {
    const response = await lastValueFrom(
      this._gastosTallerService.apiV2GastoTallerGet(
        undefined,
        undefined,
        page,
        pageSize
      )
    );
    return response;
  }

  async deleteGastos(gastosID: number) {
    await lastValueFrom(
      this._gastosTallerService.apiV2GastoTallerIdDelete(gastosID)
    );
  }
}
