import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  ImpuestoViewsDto,
  ImpuestosService as ImpuestoService,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class ImpuestosService {
  constructor(private _impuestoService: ImpuestoService) {}

  async getImpuestos(): Promise<ImpuestoViewsDto[]> {
    const response = await lastValueFrom(
      this._impuestoService.apiV2ImpuestosViewsGet()
    );
    return response.results || [];
  }
  async deleteImpuestos(impuestosId: number) {
    await lastValueFrom(
      this._impuestoService.apiV2ImpuestoIdDelete(impuestosId)
    );
  }
}
