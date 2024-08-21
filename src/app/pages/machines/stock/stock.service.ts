import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  StockDto,
  StockService as StockServiceAG,
  PrestamosYStockService,
  PrestamosStockDto,
  RegulacionesDeStockService,
  RegulacionesStockDto,
  CreatePrestamosStockDto,
  CentrosCosteDto,
  CentrosCostesService,
  ReferenciaDeMaterialesService,
  ReferenciaMaterialDto,
  GruposCentroService,
  GruposCentroDto,
} from '@valoriza/web-commons';
@Injectable({
  providedIn: 'root',
})
export class StockService {
  constructor(
    private _stockService: StockServiceAG,
    private _prestamosStockService: PrestamosYStockService,
    private _regulacionesStockService: RegulacionesDeStockService,
    private _centrosService: CentrosCostesService,
    private _referenciasMaterialesService: ReferenciaDeMaterialesService,
    private _gruposCentroService: GruposCentroService
  ) {}

  async getStock(): Promise<StockDto[]> {
    const response = await lastValueFrom(this._stockService.apiV2StockGet());
    return response.results || [];
  }

  async deleteStock(stockId: number) {
    await lastValueFrom(this._stockService.apiV2StockIdDelete(stockId));
  }

  async getPrestamosStock(): Promise<PrestamosStockDto[]> {
    const response = await lastValueFrom(
      this._prestamosStockService.apiV2PrestamosStockGet()
    );
    return response.results || [];
  }

  async createPrestamosStock(body: CreatePrestamosStockDto) {
    const response = await lastValueFrom(
      this._prestamosStockService.apiV2PrestamosStockPost(body)
    );
    return response;
  }

  async deletePrestamosStock(id: number) {
    await lastValueFrom(
      this._prestamosStockService.apiV2PrestamosStockIdDelete(id)
    );
  }

  async getRegularizacionStock(): Promise<RegulacionesStockDto[]> {
    const response = await lastValueFrom(
      this._regulacionesStockService.apiV2RegulacionesStockGet()
    );
    return response.results || [];
  }

  async createRegularizacionService(body: CreatePrestamosStockDto) {
    const response = await lastValueFrom(
      this._prestamosStockService.apiV2PrestamosStockPost(body)
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

  async getGruposCentros(): Promise<GruposCentroDto[]> {
    const response_to_get_pagination = await lastValueFrom(
      this._gruposCentroService.apiV2GruposCentroGet()
    );
    const totals = response_to_get_pagination.total;
    const response = await lastValueFrom(
      this._gruposCentroService.apiV2GruposCentroGet('', '', 1, totals)
    );
    return response.results || [];
  }

  async getReferenciaMateriales(): Promise<ReferenciaMaterialDto[]> {
    const response_to_get_pagination = await lastValueFrom(
      this._referenciasMaterialesService.apiV2ReferenciaMaterialesGet()
    );
    const totals = response_to_get_pagination.total;
    const response = await lastValueFrom(
      this._referenciasMaterialesService.apiV2ReferenciaMaterialesGet(
        '',
        '',
        1,
        totals
      )
    );
    return response.results || [];
  }
}
