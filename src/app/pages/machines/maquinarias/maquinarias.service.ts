import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  CombustiblesService,
  MaquinariaDto,
  MaquinariasService,
  SeguroDto,
  SegurosService,
  VistasService,
} from '@valoriza/web-commons';
import { LANG_ES } from '@valoriza/web-components';

@Injectable({
  providedIn: 'root',
})
export class MaquinariaService {
  constructor(
    private _maquinariasService: MaquinariasService,
    private _combustiblesService: CombustiblesService,
    private _segurosService: SegurosService,
    private vistaService: VistasService
  ) {}

  async getMaquinarias(): Promise<MaquinariaDto[]> {
    const response = await lastValueFrom(
      this._maquinariasService.apiV2MaquinariasGet()
    );
    return response.results || [];
  }

  async getMaquinariaByID(id: number): Promise<MaquinariaDto> {
    const response = await lastValueFrom(
      this._maquinariasService.apiV2MaquinariasIdGet(id)
    );
    return response;
  }

  async getSeguroByID(id: number): Promise<SeguroDto> {
    const response = await lastValueFrom(
      this._segurosService.apiV2SegurosIdGet(id)
    );
    return response;
  }

  async editDatosGeneralesMaquinaria() {}

  async getFamilias(idLang: number = LANG_ES) {
    const response = await lastValueFrom(
      this.vistaService.apiV2FamiliasTinyIdLangGet(idLang)
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.id,
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getSubFamilias(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.vistaService.apiV2FamiliasSubfamiliasTinyIdLangGet(idLang)
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.id,
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getTiposCombustible() {
    const response = await lastValueFrom(
      this._combustiblesService.apiV2CombustiblesTinyGet()
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.codigoCombustible,
          label: o.combustible || '',
        };
      }) || []
    );
  }
}
