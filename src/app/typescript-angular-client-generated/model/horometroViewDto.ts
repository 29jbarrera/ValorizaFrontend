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

export interface HorometroViewDto { 
    idMaquinaria?: number;
    centroMaquinaria?: string;
    idCentro?: number;
    maquinaria?: string;
    marca?: string;
    modelo?: string;
    horometroFinal?: number;
    kilometroFinal?: number;
    idReferencia?: number;
    fecha?: Date;
    tipo?: string;
    externa?: boolean;
    id?: number;
    familia?: string;
    subFamilia?: string;
    idFamilia?: number;
    idSubFamilia?: number;
}