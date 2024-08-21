import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
// TODO: Import the necessary modules
// import {
//   MantenimientoRepostajeService,
//   MantenimientoRepostajeDto,
// } from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class RepostajesService {
  constructor(
    // TODO: Import the necessary modules
    // private _mantenimientoRepostajeService: MantenimientoRepostajeService
  ) {}
  // TODO: Import the necessary modules
  // async getRepostajes(): Promise<MantenimientoRepostajeDto[]> {
    async getRepostajes(): Promise<any[]> {
    // const response = await lastValueFrom(
    //   this._mantenimientoRepostajeService.apiV2MantenimientoRepostajeGet()
    // );
    // return response.results || [];
    return [];
  }
  async deleteRepostajes(repostajesId: number) {
    // TODO: Import the necessary modules
    // await lastValueFrom(
    //   this._mantenimientoRepostajeService.apiV2MantenimientoRepostajeIdDelete(
    //     repostajesId
    //   )
    // );
  }
}
