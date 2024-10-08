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
import { CentrosCosteDto } from './centrosCosteDto';
import { ReferenciaMaterialDto } from './referenciaMaterialDto';

export interface StockDto { 
    id?: number;
    idEmpresa?: number;
    idCentro?: number;
    centro?: CentrosCosteDto;
    idReferenciaMaterial?: number;
    cantidad?: number;
    valor?: number;
    codMoneda?: string;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
    referenciaMaterial?: ReferenciaMaterialDto;
}