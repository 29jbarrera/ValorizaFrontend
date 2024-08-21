import { Injectable } from '@angular/core';

import {
  CentrosCosteDto,
  CentrosCostesService,
  CreateInstalacionDto,
  CreateInstalacionesElementoDto,
  CreateInstalacionesOperacioneDto,
  InstalacionDto,
  InstalacionesService as InstalacioneService,
  InstalacionesOperacionesLangDto,
  UpdateInstalacionDto,
  UpdateInstalacionesElementoDto,
  UpdateInstalacionesOperacioneDto,
} from '@valoriza/web-commons';
import { LANGS_ARR } from '@valoriza/web-components';
import { lastValueFrom } from 'rxjs';

export type CreateOperationCustom = CreateInstalacionesOperacioneDto & {
  descripcion: string;
};

export type UpdateOperationCustom = UpdateInstalacionesOperacioneDto & {
  descripcion: string;
}

@Injectable({
  providedIn: 'root',
})
export class InstalacionesService {
  constructor(
    private _instalacioneService: InstalacioneService,
    private _centrosService: CentrosCostesService
  ) {}

  async getInstalaciones(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesGet(undefined, undefined, page, perPage)
    );
    return response
  }

  async deleteInstalaciones(instalacionesID: number) {
    await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesIdDelete(instalacionesID)
    );
  }

  async editInstalaciones(body: UpdateInstalacionDto) {
    const response = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesPut(body)
    );
    return response;
  }

  async createInstalaciones(body: CreateInstalacionDto) {
    const response = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesPost(body)
    );
    return response;
  }

  async getCentros(): Promise<CentrosCosteDto[]> {
    const response_to_get_pagination = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet()
    );
    const totals = response_to_get_pagination.total;
    const response = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet('', '', 1, totals)
    );
    return response.results || [];
  }

  async createElemento(body: CreateInstalacionesElementoDto) {
    const response = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosPost(body)
    );
    return response;
  }

  async editElemento(body: UpdateInstalacionesElementoDto){
    const response = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosPut(body)
    );
    return response;
  }

  async deleteElemento(elementoID: number) {
    await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosIdDelete(elementoID)
    );
  }

  async createOperacion(operacion: CreateOperationCustom) {
    const operation_created = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosOperacionesPost({
        fecha: operacion.fecha,
        frecuencia: operacion.frecuencia,
        idElemento: operacion.idElemento,
        actuante: operacion.actuante,
      })
    );

    const operation_id = operation_created.id;
    const langs_created: InstalacionesOperacionesLangDto[] = [];

    for (const LANG of LANGS_ARR) {
      const lang = await lastValueFrom(
        this._instalacioneService.apiV2InstalacionesElementosOperacionesLangPost(
          {
            descripcion: operacion.descripcion,
            idLang: LANG,
            id: operation_id,
          }
        )
      );
      langs_created.push(lang);
    }

    operation_created.langs = langs_created;
    return { operation_created, langs_created };
  }

  async editOperacion(operacion: UpdateOperationCustom) {
    const operation_update = await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosOperacionesPut({
        id: operacion.id,
        idEmpresa: operacion.idEmpresa,
        fecha: operacion.fecha,
        frecuencia: operacion.frecuencia,
        idElemento: operacion.idElemento,
        actuante: operacion.actuante,
      })
    );


    const langs_update: InstalacionesOperacionesLangDto[] = [];

    for (const LANG of LANGS_ARR) {
      const lang = await lastValueFrom(
        this._instalacioneService.apiV2InstalacionesElementosOperacionesLangPut(
          {
            descripcion: operacion.descripcion,
            idLang: LANG,
            id: operacion.id,
          }
        )
      );
      langs_update.push(lang);
    }

    operation_update.langs = langs_update;
    return { operation_update, langs_update };
  }

  async deleteOperacion(operacionID: number) {
    await lastValueFrom(
      this._instalacioneService.apiV2InstalacionesElementosOperacionesIdDelete(
        operacionID
      )
    );
  }
}
