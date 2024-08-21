import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  InspeccionTecnicaDto,
  MaquinariasInspeccionesTecnicasService as InspeccionesTecnicaService,
} from '@valoriza/web-commons';
import { FilterType, LANG_ES } from '@valoriza/web-components';

@Injectable({
  providedIn: 'root',
})
export class ItvsService {
  constructor(
    private _inspeccionesTecnicaService: InspeccionesTecnicaService
  ) {}

  async getItvs(page: number, pageSize: number, filter: FilterType, idLang = LANG_ES) {
    const response = await lastValueFrom(
      this._inspeccionesTecnicaService.apiV2InspeccionTecnicasViewIdLangGet(
        idLang,
        undefined,
        undefined,
        page,
        pageSize,
        filter
      )
    );
    return response;
  }
  async deleteItvs(itvsId: number) {
    await lastValueFrom(
      this._inspeccionesTecnicaService.apiV2InspeccionesIdDelete(itvsId)
    );
  }
}
