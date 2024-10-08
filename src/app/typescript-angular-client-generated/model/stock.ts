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
import { CentrosCoste } from './centrosCoste';
import { Empresa } from './empresa';
import { ReferenciaMaterial } from './referenciaMaterial';

export interface Stock { 
    id?: number;
    idEmpresa?: number;
    empresa?: Empresa;
    idCentro?: number;
    centro?: CentrosCoste;
    idReferenciaMaterial?: number;
    referenciaMaterial?: ReferenciaMaterial;
    cantidad?: number;
    valor?: number;
    codMoneda?: string;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
}