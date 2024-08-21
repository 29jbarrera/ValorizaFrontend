import { Injectable } from '@angular/core';

import {
  CreateXGlobalTableDto,
  GlobalTablesService,
  UpdateXGlobalTableDto,
  XGlobalTableDto,
} from '@valoriza/web-commons';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TablaGlobalesService {
  constructor(private _xGlobalTableService: GlobalTablesService) {}
  async getGlobales(
    page = 1,
    pageSize = 100
  ){
    const response = await lastValueFrom(
      this._xGlobalTableService.apiV2GlobalTablesGet(
        undefined,
        undefined,
        page,
        pageSize
      )
    );
    return response
  }
  async deleteGlobales(globalesId: number) {
    await lastValueFrom(
      this._xGlobalTableService.apiV2GlobalTablesIdDelete(globalesId)
    );
  }

  async create(body: CreateXGlobalTableDto) {
    return lastValueFrom(this._xGlobalTableService.apiV2GlobalTablesPost(body));
  }

  async edit(body: UpdateXGlobalTableDto) {
    return lastValueFrom(this._xGlobalTableService.apiV2GlobalTablesPut(body));
  }
}
