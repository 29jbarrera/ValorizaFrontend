import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import { MaquinariaDto, MaquinariasService } from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class CambioCentroService {
  constructor(private _maquinariaService: MaquinariasService) {}
  async getCambioCentro(): Promise<MaquinariaDto[]> {
    const response = await lastValueFrom(
      this._maquinariaService.apiV2MaquinariasGet()
    );
    return response.results || [];
  }
  async deleteCambioCentro(cambiocentroId: number) {
    await lastValueFrom(
      this._maquinariaService.apiV2MaquinariasIdDelete(cambiocentroId)
    );
  }
}
