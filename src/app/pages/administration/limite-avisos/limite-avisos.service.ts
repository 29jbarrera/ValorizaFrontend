import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  AppParameterService,
  UpdateAppParameterDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class LimiteAvisosService {
  constructor(private _parametroService: AppParameterService) {}
  async getLimiteAvisos(page: number = 1, pageSize: number = 100) {
    const response = await lastValueFrom(
      this._parametroService.apiV2ParametrosGet(
        undefined,
        undefined,
        page,
        pageSize
      )
    );
    return response;
  }
  async deleteLimiteAvisos(limiteAvisosId: number) {
    await lastValueFrom(
      this._parametroService.apiV2ParametrosIdDelete(limiteAvisosId)
    );
  }

  async edit(body: UpdateAppParameterDto) {
    return await lastValueFrom(this._parametroService.apiV2ParametrosPut(body));
  }
}
