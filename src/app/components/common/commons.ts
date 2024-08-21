import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { DateTime } from 'luxon';
import * as XLSX from 'xlsx';

/**
 * Round a number to a certain number of decimal places (CENT to EUR)
 *
 * @export
 * @param {number} amount
 * @return {*}
 */
export function format_price_amount(amount: number) {
  return amount
    .toFixed(2)
    .replace('.', ',')
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Formatea una fecha en el formato "dd/MM/yyyy"
 *
 * @export
 * @param {string | Date} date La fecha que se va a formatear, puede ser una cadena o un objeto Date
 * @return {string} La fecha formateada como "dd/MM/yyyy"
 */
export function format_date(date: string | Date): string {
  return DateTime.fromJSDate(new Date(date)).toFormat('dd/MM/yyyy');
}

/**
 * Get the icon for a boolean value
 *
 * @export
 * @param {boolean} value
 * @return {*}  {string}
 */
export function get_icon_boolean(value: boolean): string {
  return value
    ? 'text-green-500 pi-check-circle'
    : 'text-red-500 pi-times-circle';
}

export const LANG_ES = 3082;
export const LANG_EN = 1033;
export const LANGS_ARR = [LANG_ES, LANG_EN];

/**
 * Return the name of the file with the current date
 *
 * @export
 * @param {string} name
 * @return {*}
 */
export function get_xlsx_name(name: string) {
  return `${name}-${DateTime.now().toFormat('yyyyMMddHHmmss')}.xlsx`;
}

/**
 * Export data to excel
 *
 * @export
 * @param {any[]} data_to_sheet
 * @param {string} name
 */
export function export_data_to_excel(data_to_sheet: any[], name: string) {
  const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(data_to_sheet);
  const wb: XLSX.WorkBook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'sheet1');
  XLSX.writeFile(wb, get_xlsx_name(name));
}

/**
 * Get description of a language
 *
 * @export
 * @param {any[]} langs Array of languages
 * @param {number} [code=LANG_ES] Language code
 * @return {*}
 */
export function get_lang_description(langs: any[], code: number = LANG_ES) {
  if (Array.isArray(langs)) {
    return langs.find((lang) => lang.idLang === code)?.descripcion || '';
  }

  console.error('langs is not an array');
  return '';
}

// Función que normaliza una cadena de texto
export function normaliceString(str: string) {
  return (
    str
      // Separa los caracteres diacríticos de sus letras base
      .normalize('NFD')
      // Elimina los caracteres diacríticos que no están en la lista de caracteres de combinación de diacríticos del idioma español
      .replace(
        /([^n\u0300-\u036f]|n(?!\u0303(?![\u0300-\u036f])))[\u0300-\u036f]+/gi,
        '$1'
      )
      // Combina los caracteres diacríticos con sus letras base nuevamente
      .normalize()
  );
}

// Función que verifica si una cadena de texto está incluida en otra
export function stringOneIncludeInStringTwo(str1 = '', str2 = ''): boolean {
  // Normaliza y convierte a minúsculas la cadena str1
  const _str1 = normaliceString(str1).trim().toLowerCase();
  // Normaliza y convierte a minúsculas la cadena str2
  const _str2 = normaliceString(str2).trim().toLowerCase();
  // Verifica si la cadena str1 está incluida en la cadena str2
  return _str2.includes(_str1);
}

export class CommonTable<T> {
  value: T[] = [];
  public lazy: boolean = true;
  public rows: number = 10;
  public rowsPerPageOptions: number[] = [5, 10, 20, 100];
  public loading: boolean = true;
  public totalRecords: number = 0;
  public paginator = true;
  public showCurrentPageReport = true;
  public currentPageReportTemplate: string =
    'Showing {first} to {last} of {totalRecords} entries';
  currentPage = 1;
  currentPerPage = 10;
  public search_model: any = {};
  public search_options: FormlyFormOptions = {};
  public search_fields: FormlyFieldConfig[] = [];

  public filter: FilterType = undefined;

  async search(model: any) {
    this.filter = transformToFilter(model);
    this.updateTable();
  }

  loadData(e: any) {
    this.currentPage = e.first / e.rows + 1;
    this.currentPerPage = e.rows;
    this.updateTable(this.currentPage, this.currentPerPage);
  }

  async get_values(
    page: number = 1,
    pageSize: number = 100,
    filter: FilterType = undefined
  ): Promise<{
    hasNext?: boolean;
    hasPrev?: boolean;
    total?: number;
    page?: number;
    perPage?: number;
    pages?: number;
    results?: Array<T>;
  }> {
    return {};
  }

  async updateTable(
    page: number = this.currentPage,
    perPage: number = this.currentPerPage
  ) {
    this.loading = true;
    const response = await this.get_values(page, perPage, this.filter);
    this.value = response.results || [];
    this.totalRecords = response.total || 0;
    this.loading = false;
  }
}

export function transformToFilter(obj: any): FilterType {
  const _obj: any = {};
  Object.keys(obj).forEach((key) => {
    const value = obj[key];
    if (value !== undefined && value !== null && value !== '') {
      _obj[get_kyp_to_filter(key)] = value;
    }
  });
  return _obj;
}

export type FilterType = { [key: string]: string } | undefined;

function get_kyp_to_filter(key: string) {
  const _key = key.substring(0, 1).toUpperCase() + key.substring(1);
  return `FILTERS[${_key}]`;
}
