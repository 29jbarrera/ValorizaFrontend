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

export interface UpdateRepostajeDto { 
    id?: number;
    idEmpresa: number;
    idCentro?: number;
    idMaquinaria?: number;
    idDeposito?: number;
    fecha: Date;
    cantidad: number;
    codUnidad?: string;
    cuenta?: string;
    tarjeta?: string;
    bidon?: string;
    idBidon?: number;
}