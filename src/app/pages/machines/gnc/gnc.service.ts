import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  GncDto,
  GncService as GncServiceAG,
  UpdateGncDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class GncService {
  constructor(private _gncService: GncServiceAG) {}
  async getGnc(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._gncService.apiV2GncGet(undefined, undefined, page, perPage)
    );
    return response;
  }
  async deleteGnc(gncId: number) {
    await lastValueFrom(this._gncService.apiV2GncIdDelete(gncId));
  }

  async editGnc(body: UpdateGncDto) {
    await lastValueFrom(this._gncService.apiV2GncPut(body));
  }
}
