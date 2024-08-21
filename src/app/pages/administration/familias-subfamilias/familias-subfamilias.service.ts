import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  CreateFamiliaDto,
  CreateSubFamiliaDto,
  FamiliaDto,
  FamiliasLangDto,
  FamiliasService,
  NivelesDeMantenimientoService,
  UpdateFamiliaDto,
  UpdateSubFamiliaDto,
} from '@valoriza/web-commons';
import { LANGS_ARR, Selection } from '@valoriza/web-components';

export type CreateSubFamiliaCustom = CreateSubFamiliaDto & {
  descripcion: string;
};

export type CreateFamiliaCustom = CreateFamiliaDto & {
  descripcion: string;
};

export type UpdateFamiliaCustom = UpdateFamiliaDto & {
  descripcion: string;
};

@Injectable({
  providedIn: 'root',
})
export class FamiliasSubfamiliasService {
  constructor(
    private _familiaService: FamiliasService,
    private _nivelesService: NivelesDeMantenimientoService
  ) {}

  async getFamilias(page: number = 1, perPage: number = 100) {
    const response = await lastValueFrom(
      this._familiaService.apiV2FamiliasGet(undefined, undefined, page, perPage)
    );
    return response;
  }

  async getNiveles(): Promise<Selection[]> {
    const response = await lastValueFrom(
      this._nivelesService.apiV2NivelMantenimientoTinyGet()
    );
    return (
      response.results?.map((n) => {
        return {
          value: n.id || '',
          label: n.codigo || '',
        };
      }) || []
    );
  }

  async createFamilia(body: CreateFamiliaCustom) {
    const familia_created = await lastValueFrom(
      this._familiaService.apiV2FamiliasPost(body)
    );

    const langs_create: FamiliasLangDto[] = [];

    for (const LANG of LANGS_ARR) {
      const lang = await lastValueFrom(
        this._familiaService.apiV2FamiliasLangPost({
          descripcion: body.descripcion,
          idLang: LANG,
          id: familia_created.id,
        })
      );

      langs_create.push(lang);
    }

    familia_created.langs = langs_create;
    return { familia_created, langs_create };
  }

  async editFamilia(familia: UpdateFamiliaCustom) {
    const familia_update = await lastValueFrom(
      this._familiaService.apiV2FamiliasPut({ id: familia.id })
    );

    const langs_update: FamiliasLangDto[] = [];

    for (const LANG of LANGS_ARR) {
      const lang = await lastValueFrom(
        this._familiaService.apiV2FamiliasLangPut({
          descripcion: familia.descripcion,
          idLang: LANG,
          id: familia.id,
        })
      );
      langs_update.push(lang);
    }

    familia_update.langs = langs_update;
    return { familia_update, langs_update };
  }

  async deleteFamilia(familiaID: number) {
    await lastValueFrom(this._familiaService.apiV2FamiliasIdDelete(familiaID));
  }

  async createSubFamilia(body: CreateSubFamiliaCustom) {
    const subfamilia_created = await lastValueFrom(
      this._familiaService.apiV2SubFamiliaPost(body)
    );

    const langs_create: FamiliasLangDto[] = [];

    for (const LANG of LANGS_ARR) {
      const lang = await lastValueFrom(
        this._familiaService.apiV2SubFamiliasLangPost({
          descripcion: body.descripcion,
          idLang: LANG,
          id: subfamilia_created.id,
        })
      );

      langs_create.push(lang);
    }

    subfamilia_created.langs = langs_create;
    return { subfamilia_created, langs_create };
  }

  async editSubFamilia(body: UpdateSubFamiliaDto) {
    const response = await lastValueFrom(
      this._familiaService.apiV2SubFamiliaPut(body)
    );

    return response;
  }

  async deleteSubFamilia(subFamiliaID: number) {
    await lastValueFrom(
      this._familiaService.apiV2SubFamiliaIdDelete(subFamiliaID)
    );
  }
}
