import { Injectable } from '@angular/core';

import {
  CreateNivelMantenimientoTiposAccionDto,
  NivelMantenimientoTiposAccionDto,
  NivelesDeMantenimientoTipoDeAccinService,
  UpdateNivelMantenimientoTiposAccionDto,
} from '@valoriza/web-commons';
import { FilterType } from '@valoriza/web-components';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NivelesAccionService {
  constructor(
    private _nivelesMantenimientoAccionesService: NivelesDeMantenimientoTipoDeAccinService
  ) {}
  async getNivelesAccion(
    page: number = 1,
    pageSize: number = 100,
    filters: FilterType = undefined
  ) {
    const response = await lastValueFrom(
      this._nivelesMantenimientoAccionesService.apiV2NivelesMantenimientoTipoAccionViewGet(
        undefined,
        undefined,
        page,
        pageSize,
        filters
      )
    );
    return response;
  }
  async deleteNivelesAccion(id: number) {
    await lastValueFrom(
      this._nivelesMantenimientoAccionesService.apiV2NivelesMantenimientoTipoAccionIdDelete(
        id
      )
    );
  }
  async createNivelesAccion(body: CreateNivelMantenimientoTiposAccionDto) {
    const response = await lastValueFrom(
      this._nivelesMantenimientoAccionesService.apiV2NivelesMantenimientoTipoAccionPost(
        body
      )
    );
    return response;
  }

  async editNivelesAccion(body: UpdateNivelMantenimientoTiposAccionDto) {
    const response = await lastValueFrom(
      this._nivelesMantenimientoAccionesService.apiV2NivelesMantenimientoTipoAccionPut(
        body
      )
    );
    return response;
  }
}
