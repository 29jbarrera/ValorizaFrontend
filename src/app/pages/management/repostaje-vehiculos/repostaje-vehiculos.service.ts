import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { RepostajeDto, MaquinariasRepostajesService } from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class RepostajeVehiculosService {
  constructor(private _repostajeService: MaquinariasRepostajesService) {}
  async getRepostajeVehiculos(): Promise<RepostajeDto[]> {
    const response = await lastValueFrom(
      this._repostajeService.apiV2RepostajesGet()
    );
    return response.results || [];
  }
  async deleteRepostajeVehículos(repostajeVehiculosId: number) {
    await lastValueFrom(
      this._repostajeService.apiV2RepostajesIdDelete(repostajeVehiculosId)
    );
  }
}
