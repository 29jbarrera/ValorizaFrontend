import { Injectable } from '@angular/core';
import { RatiosViewDto, CentrosCostesService } from '@valoriza/web-commons';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RatiosCentroService {
  // constructor(private _centroCoste: CentrosCostesService) {}
  // async getRAtiosCentro(): Promise<RatiosViewDto[]> {
  //   const _response = await lastValueFrom(
  //     this._centroCoste.apiV2CentrosCosteGet(undefined, undefined, 1, 100)
  //   );
  //   return _response.results || [];
  // }
}
