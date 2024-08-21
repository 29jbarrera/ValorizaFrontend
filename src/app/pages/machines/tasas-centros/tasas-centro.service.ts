import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
// TODO: Import the necessary modules
// import {
  // TasasHistoricoDto,
  // TasasHistoricoService,
// } from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class TasasCentroService {
  constructor(
    // private _tasasHistoricoService: TasasHistoricoService
  ) {}

  // async getTasasCentro(): Promise<TasasHistoricoDto[]> {
  async getTasasCentro(): Promise<any[]> {
    // const response = await lastValueFrom(
    //   this._tasasHistoricoService.apiV2TasasHistoricoGet()
    // );
    // return response.results || [];
    return [];
  }
  async deleteTasasCentro(tasasCentroId: number) {
    // await lastValueFrom(
      // this._tasasHistoricoService.apiV2TasasHistoricoIdDelete(tasasCentroId)
    // );
  }
}
