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
import { ReferenciaMaterialDto } from './referenciaMaterialDto';

export interface ParteTrabajoMaterialDto { 
    id?: number;
    idParteTrabajo?: number;
    idReferenciaMaterial?: number;
    referenciaMaterial?: ReferenciaMaterialDto;
    descripcion?: string;
    cantidad?: number;
    gastoConmutable?: boolean;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
}