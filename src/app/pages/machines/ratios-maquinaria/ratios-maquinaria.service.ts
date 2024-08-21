import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
// TODO: Importar modulos necesarios
import {
  RatiosViewDto,
  MaquinariasService,
  MaquinariaDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class RatiosMaquinariaService {
  constructor(private _maquinariaService: MaquinariasService) {}

  async getRatiosMaquinaria(page: number = 1, pageSize: number = 100) {
    const response = await lastValueFrom(
      this._maquinariaService.apiV2MaquinariasGet(
        undefined,
        undefined,
        page,
        pageSize
      )
    );

    return response;
  }
}
