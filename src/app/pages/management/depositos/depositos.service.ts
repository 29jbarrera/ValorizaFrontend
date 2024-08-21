import { Injectable } from '@angular/core';

import {
  DepositosService as DepositoService,
  DepositoDto,
} from '@valoriza/web-commons';
import { FilterType } from '@valoriza/web-components';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DepositosService {
  constructor(private _depositoService: DepositoService) {}
  async getDepositos(
    page: number = 1,
    pageSize: number = 100,
    filters: FilterType = undefined
  ) {
    const response = await lastValueFrom(
      this._depositoService.apiV2DepositosViewGet(
        undefined,
        undefined,
        page,
        pageSize,
        filters
      )
    );
    return response;
  }
  async deleteDepositos(depositosId: number) {
    await lastValueFrom(
      this._depositoService.apiV2DepositosIdDelete(depositosId)
    );
  }
}
