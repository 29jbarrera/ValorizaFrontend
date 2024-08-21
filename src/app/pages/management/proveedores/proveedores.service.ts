import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  CreateProveedorDto,
  ProveedorDto,
  ProveedoresService as ProveedorService,
  UpdateProveedorDto,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class ProveedoresService {
  constructor(private _proveedoresService: ProveedorService) {}
  async getProveedores(
    page: number,
    pageSize: number
  ) {
    const response = await lastValueFrom(
      this._proveedoresService.apiV2ProveedoresGet(
        undefined,
        undefined,
        page,
        pageSize
      )
    );
    return response //.results || [];
  }

  async deleteProveedores(proveedoresId: number) {
    await lastValueFrom(
      this._proveedoresService.apiV2ProveedoresIdDelete(proveedoresId)
    );
  }

  async edit(body: UpdateProveedorDto) {
    const response = await lastValueFrom(
      this._proveedoresService.apiV2ProveedoresPut(body)
    );
    return response;
  }

  async create(body: CreateProveedorDto) {
    const response = await lastValueFrom(
      this._proveedoresService.apiV2ProveedoresPost(body)
    );
    return response;
  }
}
