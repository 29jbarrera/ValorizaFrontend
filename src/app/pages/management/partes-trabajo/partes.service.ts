import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  CreateParteTrabajoDto,
  ParteTrabajoDto,
  PartesDeTrabajoService,
  UpdateParteTrabajoDto,
  CenterDto,
  GruposCentroService,
  CentrosCostesService,
  CentrosCosteDto,
  TiposActuacionDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class PartesService {
  constructor(
    private _partesTrabajoService: PartesDeTrabajoService,
    private _gruposCentroService: GruposCentroService,
    private _centrosCosteService: CentrosCostesService
  ) {}

  async getPartes(): Promise<ParteTrabajoDto[]> {
    const response = await lastValueFrom(
      this._partesTrabajoService.apiV2ParteTrabajoGet()
    );
    return response.results || [];
  }

  async getParteById(id: number): Promise<ParteTrabajoDto> {
    const response = await lastValueFrom(
      this._partesTrabajoService.apiV2ParteTrabajoIdGet(id)
    );
    return response || null;
  }

  async create(body: CreateParteTrabajoDto) {
    const response = await lastValueFrom(
      this._partesTrabajoService.apiV2ParteTrabajoPost(body)
    );
    return response;
  }

  async getDelegations(): Promise<CenterDto[]> {
    const response = await lastValueFrom(
      this._gruposCentroService.apiV2GruposCentroGet()
    );
    return response.results || [];
  }

  async getCenter(): Promise<CentrosCosteDto[]> {
    const response = await lastValueFrom(
      this._centrosCosteService.apiV2CentrosCosteGet()
    );
    return response.results || [];
  }

  // async deletePartes(partesId: number) {
  //   await lastValueFrom(
  //     this._partesTrabajoService.apiV2ParteTrabajoIdDelete(partesId)
  //   );
  // }

  // async edit(body: UpdateParteTrabajoDto) {
  //   const response = await lastValueFrom(
  //     this._partesTrabajoService.apiV2ParteTrabajoPut(body)
  //   );
  //   return response;
  // }
}
