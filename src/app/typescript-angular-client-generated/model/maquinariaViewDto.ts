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
import { FamiliaDto } from './familiaDto';
import { SubFamiliaDto } from './subFamiliaDto';

export interface MaquinariaViewDto { 
    id?: number;
    idEmpresa?: number;
    matricula?: string;
    bastidor?: string;
    idCentro?: number;
    centro?: string;
    idCentroCompra?: number;
    centroCompra?: string;
    idFamilia?: number;
    familia?: FamiliaDto;
    subFamilia?: SubFamiliaDto;
    idSubfamilia?: number;
    idSeguro?: number;
    fechaMatriculacion?: string;
    codTipoCombustible?: string;
    codNivelEmisiones?: string;
    fechaGnc?: string;
    codMoneda?: string;
    conductor?: string;
    servicio?: string;
    mediaHorasDia?: number;
    mediaKmsDia?: number;
    marcaChasis?: string;
    modeloChasis?: string;
    toneladasChasis?: number;
    precioChasis?: number;
    contratoChasis?: string;
    bancoChasis?: string;
    fechaChasis?: string;
    duracionChasis?: number;
    aseguradora?: string;
    codTipoSeguro?: string;
    codigo?: string;
    fechaInicio?: string;
    fechaFin?: string;
    precioPoliza?: number;
    codTipoPago?: string;
    operativa?: boolean;
    comentarios?: string;
    implemento1Descripcion?: string;
    implemento1Marca?: string;
    implemento1Modelo?: string;
    implemento1Serie?: string;
    implemento1Precio?: number;
    implemento1Tasa?: number;
    implemento1CodMoneda?: string;
    implemento1Contrato?: string;
    implemento1CodTipoPago?: string;
    implemento1Banco?: string;
    implemento1Fecha?: string;
    implemento1Duracion?: number;
    implemento2Descripcion?: string;
    implemento2Marca?: string;
    implemento2Modelo?: string;
    implemento2Serie?: string;
    implemento2Precio?: number;
    implemento2Tasa?: number;
    implemento2CodMoneda?: string;
    implemento2Contrato?: string;
    implemento2CodTipoPago?: string;
    implemento2Banco?: string;
    implemento2Fecha?: string;
    implemento2Duracion?: number;
    implemento3Descripcion?: string;
    implemento3Marca?: string;
    implemento3Modelo?: string;
    implemento3Serie?: string;
    implemento3Precio?: number;
    implemento3Tasa?: number;
    implemento3CodMoneda?: string;
    implemento3Contrato?: string;
    implemento3CodTipoPago?: string;
    implemento3Banco?: string;
    implemento3Fecha?: string;
    implemento3Duracion?: number;
}