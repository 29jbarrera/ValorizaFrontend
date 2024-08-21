import { Injectable } from '@angular/core';
import { lastValueFrom } from 'rxjs';
import {
  CentrosCostesService,
  ValorizaGlobalTableService,
  VistasService,
} from '@valoriza/web-commons';
import { LANG_ES } from '@valoriza/web-components';

export type Selection = {
  value: string | number;
  label: string;
};

@Injectable({
  providedIn: 'root',
})
export class ValorizaTypesService {
  constructor(
    private vistaService: VistasService,
    private ValorizaGlobalTableService: ValorizaGlobalTableService,
    private _centrosService: CentrosCostesService
  ) {}

  async getFamilias(idLang: number = LANG_ES): Promise<Selection[]> {
    const response = await lastValueFrom(
      this.vistaService.apiV2FamiliasTinyIdLangGet(idLang)
    );

    return (
      response.results?.map((o) => {
        return {
          value: o.id || '',
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getFamiliasLabel(idLang: number = LANG_ES): Promise<Selection[]> {
    const response = await lastValueFrom(
      this.vistaService.apiV2FamiliasTinyIdLangGet(idLang)
    );

    return (
      response.results?.map((o) => {
        return {
          value: o.nombre || '',
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getSubFamilias(idLang = LANG_ES): Promise<Selection[]> {
    const response = await lastValueFrom(
      this.vistaService.apiV2FamiliasSubfamiliasTinyIdLangGet(idLang)
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.id || '',
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getTypes() {
    return lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewGet()
    );
  }

  async getNivelEmisiones(idLang = LANG_ES): Promise<Selection[]> {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'NivelEmisiones'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  async getTipoServicio(idLang = LANG_ES): Promise<Selection[]> {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoServicio'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  async getEstadoMaquinaria(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'EstadoMaquinaria'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }

  // CodigoOperacion
  async getCodigoOperacion(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'CodigoOperacion'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // EstadoSeguro
  async getEstadoSeguro(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'EstadoSeguro'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // PartesTrabajoEstado
  async getPartesTrabajoEstado(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'PartesTrabajoEstado'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoAccionMant
  async getTipoAccionMant(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoAccionMant'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoActuacion
  async getTipoActuacion(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoActuacion'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoCentro
  async getTipoCentro(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoCentro'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoCombustible
  async getTipoCombustible(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoCombustible'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoCombustibleBidon
  async getTipoCombustibleBidon(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoCombustibleBidon'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoDocumento
  async getTipoDocumento(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoDocumento'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoMantenimiento
  async getTipoMantenimiento(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoMantenimiento'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoNivelMantenimien
  async getTipoNivelMantenimien(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoNivelMantenimien'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoPago
  async getTipoPago(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoPago'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoRepostaje
  async getTipoRepostaje(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoRepostaje'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoResiduo
  async getTipoResiduo(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoResiduo'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }
  // TipoSeguro
  async getTipoSeguro(idLang = LANG_ES) {
    const response = await lastValueFrom(
      this.ValorizaGlobalTableService.apiV2ValorizaGlobalTableViewIdLangNameGet(
        idLang,
        'TipoSeguro'
      )
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.code || '',
          label: o.descripcion || '',
        };
      }) || []
    );
  }

  async getCentros() {
    return this.getCentrosCostes();
  }

  async getCentrosCostes() {
    const response_to_get_pagination = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet()
    );
    const totals = response_to_get_pagination.total;
    const response = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet('', '', 1, totals)
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.id || '',
          label: o.nombre || '',
        };
      }) || []
    );
  }

  async getCentrosLabel() {
    return this.getCentrosCostesLabel();
  }

  async getCentrosCostesLabel() {
    const response_to_get_pagination = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet()
    );
    const totals = response_to_get_pagination.total;
    const response = await lastValueFrom(
      this._centrosService.apiV2CentrosCosteGet('', '', 1, totals)
    );
    return (
      response.results?.map((o) => {
        return {
          value: o.nombre || '',
          label: o.nombre || '',
        };
      }) || []
    );
  }
}
