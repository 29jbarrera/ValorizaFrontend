import { Injectable } from '@angular/core';
import { HmKmService, UpdateHmKmDto } from '@valoriza/web-commons';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorometrosKilometrosService {
  constructor(private _hmkmService: HmKmService) {}

  async getHorometrosKilometros(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._hmkmService.apiV2HmKmGet(undefined, undefined, page, perPage)
    );
    return response;
  }

  async deleteHorometrosKilometros(hmkmID: number) {
    await lastValueFrom(this._hmkmService.apiV2HmKmIdDelete(hmkmID));
  }

  async edit(body: UpdateHmKmDto) {
    const response = await lastValueFrom(this._hmkmService.apiV2HmKmPut(body));
    return response;
  }
}
