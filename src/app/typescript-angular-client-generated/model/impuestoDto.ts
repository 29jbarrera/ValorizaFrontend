/**
 * Valoriza Park API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v2
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { MaquinariaShortDto } from './maquinariaShortDto';

export interface ImpuestoDto { 
    id?: number;
    idEmpresa?: number;
    importe?: number;
    codMoneda?: string;
    maquinaria?: MaquinariaShortDto;
    fecha?: string;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
}