import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
// TODO: Importar Servicio correcto
import {
  MaquinariasReparacionesService,
  ReparacionDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class ReparacionesCentroService {
  constructor(
    private _reparacionesDocService: MaquinariasReparacionesService
  ) {}

  async getReparacionesCentro(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._reparacionesDocService.apiV2ReparacionesGet(
        undefined,
        undefined,
        page,
        perPage
      )
    );
    return response;
  }
  async deleteReparacionesCentro(id: number) {
    await lastValueFrom(
      this._reparacionesDocService.apiV2ReparacionesIdDelete(id)
    );
  }
}
