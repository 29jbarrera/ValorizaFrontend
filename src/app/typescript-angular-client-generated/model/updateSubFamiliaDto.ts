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

export interface UpdateSubFamiliaDto { 
    id?: number;
    idFamilia: number;
    grua: boolean;
    fichaTecnica: boolean;
    inspeccionTecnica: boolean;
    permisoCirculacion: boolean;
    seguro: boolean;
    tarjetaTransporte: boolean;
    tacografo: boolean;
    marcadoCe: boolean;
    conformidad: boolean;
    peso: boolean;
    gnc: boolean;
    idNivelMantenimientoChasis?: number;
    idNivelMantenimientoEquipo?: number;
    idNivelMantenimientoImplemento?: number;
    esImplemento: boolean;
}