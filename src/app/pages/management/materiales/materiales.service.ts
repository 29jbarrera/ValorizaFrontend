import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';

import {
  CategoriaDto,
  CategoriasService,
  CreateMarcaReferenciaMaterialDto,
  CreateReferenciaMaterialDto,
  CreateSubFamiliaReferenciaMaterialDto,
  FamiliasService,
  MarcaDto,
  MarcasService,
  ReferenciaDeMaterialesService,
  ReferenciaMaterialDto,
  SubFamiliaDto,
  UpdateReferenciaMaterialDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class MaterialesService {
  constructor(
    private _materialesService: ReferenciaDeMaterialesService,
    private _familiasService: FamiliasService,
    private _marcasService: MarcasService,
    private _categoriasService: CategoriasService
  ) {}

  async getMateriales(): Promise<ReferenciaMaterialDto[]> {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesGet()
    );
    return response.results || [];
  }

  async getSubFamilies(): Promise<SubFamiliaDto[]> {
    const response = await lastValueFrom(
      this._familiasService.apiV2SubFamiliaGet()
    );
    return response.results || [];
  }

  async getMarcas(): Promise<MarcaDto[]> {
    const response = await lastValueFrom(this._marcasService.apiV2MarcasGet());
    return response.results || [];
  }

  // TODO: Get Category By ID
  async getCategoryByID(categoryID: string): Promise<CategoriaDto> {
    const response = await lastValueFrom(
      this._categoriasService.apiV2CategoriasCodigoGet(categoryID)
    );
    return response;
  }

  async getCategories(): Promise<CategoriaDto[]> {
    const response = await lastValueFrom(
      this._categoriasService.apiV2CategoriasGet()
    );
    return response.results || [];
  }

  async createMaterial(body: CreateReferenciaMaterialDto) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesPost(body)
    );
    return response;
  }

  async editMaterial(body: UpdateReferenciaMaterialDto) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesPut(body)
    );
    return response;
  }

  async deleteMaterial(materialID: number) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesIdDelete(materialID)
    );
    return response;
  }

  async createMarca(body: CreateMarcaReferenciaMaterialDto) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesMarcaPost(body)
    );
    return response;
  }

  async deleteMarca(marcaID: number) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesMarcaIdDelete(marcaID)
    );
    return response;
  }

  async createSubFamilia(body: CreateSubFamiliaReferenciaMaterialDto) {
    const response = await lastValueFrom(
      this._materialesService.apiV2ReferenciaMaterialesSubFamiliaPost(body)
    );
    return response;
  }
}
