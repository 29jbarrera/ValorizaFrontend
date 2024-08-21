import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  TacografoDto,
  MaquinariasTacografosService,
  UpdateTacografoDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class TacografosService {
  constructor(private _tacografoService: MaquinariasTacografosService) {}

  async getTacografos(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._tacografoService.apiV2TacografoGet(
        undefined,
        undefined,
        page,
        perPage
      )
    );

    return response;
  }
  async deleteTacografos(id: number) {
    await lastValueFrom(this._tacografoService.apiV2TacografoIdDelete(id));
  }

  async edit(body: UpdateTacografoDto) {
    const response = await lastValueFrom(
      this._tacografoService.apiV2TacografoPut(body)
    );
    return response;
  }
}
