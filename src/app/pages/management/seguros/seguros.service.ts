import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  SeguroDto,
  SegurosService as SeguroService,
  UpdateSeguroDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class SegurosService {
  constructor(private _seguroService: SeguroService) {}

  async getSeguros(page: number = 1, pageSize: number = 100) {
    const response = await lastValueFrom(
      this._seguroService.apiV2SegurosGet(undefined, undefined, page, pageSize)
    );
    return response;
  }
  async deleteSeguros(segurosId: number) {
    await lastValueFrom(this._seguroService.apiV2SegurosIdDelete(segurosId));
  }

  async edit(body: UpdateSeguroDto) {
    const response = await lastValueFrom(
      this._seguroService.apiV2SegurosPut(body)
    );
    return response;
  }
}
