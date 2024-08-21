import { Injectable } from '@angular/core';

import {
  CreateGruaDto,
  GruaDto,
  GruasService as GruaService,
  UpdateGruaDto,
} from '@valoriza/web-commons';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GruasService {
  constructor(private _gruasService: GruaService) {}

  async getGruas(page: number, perPage: number) {
    const _response = await lastValueFrom(
      this._gruasService.apiV2GruaGet(undefined, undefined, page, perPage)
    );
    return _response;
  }

  async deleteGruas(gruaID: number) {
    await lastValueFrom(this._gruasService.apiV2GruaIdDelete(gruaID));
  }

  async edit(body: UpdateGruaDto) {
    const response = await lastValueFrom(this._gruasService.apiV2GruaPut(body));
    return response;
  }

  async create(body: CreateGruaDto) {
    const response = await lastValueFrom(
      this._gruasService.apiV2GruaPost(body)
    );
    return response;
  }
}
