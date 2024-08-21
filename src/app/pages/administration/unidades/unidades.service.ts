import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  UnidadesDeMedidaTiposDeCombustibleService,
  UnidadMedidaTiposCombustibleDto,
  UnidadesDeMedidaService,
  VistasService,
  CombustiblesService,
  UpdateUnidadMedidaTiposCombustibleDto,
  CreateUnidadMedidaTiposCombustibleDto,
  ValorizaTypeDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class UnidadesService {
  constructor(
    private _unidadMedidaTiposCombustibleService: UnidadesDeMedidaTiposDeCombustibleService,
    private _unidadesDeMedidaService: UnidadesDeMedidaService,
    private _vistasService: VistasService,
    private _combustiblesService: CombustiblesService
  ) {}

  async getUnidades(): Promise<UnidadMedidaTiposCombustibleDto[]> {
    const response = await lastValueFrom(
      this._unidadMedidaTiposCombustibleService.apiV2UnidadesMedidaTipoCombustibleGet()
    );

    return response.results || [];
  }

  async deleteUnidad(gastosTallerId: number) {
    await lastValueFrom(
      this._unidadMedidaTiposCombustibleService.apiV2UnidadesMedidaTipoCombustibleIdDelete(
        gastosTallerId
      )
    );
  }

  async getTiposCombustible(): Promise<ValorizaTypeDto[]> {
    const response = await lastValueFrom(
      this._combustiblesService.apiV2CombustiblesTinyGet()
    );
    return response.results || [];
  }

  async getDataToCreate() {
    // TODO: #4465
    const unidades_response = await lastValueFrom(
      this._unidadesDeMedidaService.apiV2UnidadesMedidaGet()
    );
    const unidades = unidades_response.results || [];
    const combustibles = await this.getTiposCombustible();

    return {
      unidades,
      combustibles,
    };
  }

  async edit(body: UpdateUnidadMedidaTiposCombustibleDto) {
    const response = await lastValueFrom(
      this._unidadMedidaTiposCombustibleService.apiV2UnidadesMedidaTipoCombustiblePut(
        body
      )
    );
    return response;
  }

  async create(body: CreateUnidadMedidaTiposCombustibleDto) {
    const response = await lastValueFrom(
      this._unidadMedidaTiposCombustibleService.apiV2UnidadesMedidaTipoCombustiblePost(
        body
      )
    );
    return response;
  }
}
