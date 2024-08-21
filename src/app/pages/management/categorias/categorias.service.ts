import { Injectable } from '@angular/core';

import { lastValueFrom } from 'rxjs';
import {
  CategoriaDto,
  CategoriasService as CategoriesService,
} from '@valoriza/web-commons';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {
  constructor(private _categoriaService: CategoriesService) {}

  async getCategorias(page: number, pageSize: number) {
    const response = await lastValueFrom(
      this._categoriaService.apiV2CategoriasGet(undefined, undefined, page, pageSize)
    );
    return response;
  }

  async deleteCategorias(codigo: string) {
    await lastValueFrom(
      this._categoriaService.apiV2CategoriasCodigoGet(codigo)
    );
  }
}
