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

export interface CreateReparacionDto { 
    idCentro?: number;
    idMaquinaria: number;
    idProveedor?: number;
    fecha: string;
    codTipoReparacion: string;
    codNivelReparacion: string;
    codMoneda: string;
    codEstado: string;
    repuestos: number;
    neumaticos: number;
    externos: number;
    revision: number;
    frenos: number;
    transfer: number;
    embragues: number;
    latiguillos: number;
    pintura: number;
    obra: number;
    otros: number;
    comentarios?: string;
    observaciones?: string;
    automatico: boolean;
}