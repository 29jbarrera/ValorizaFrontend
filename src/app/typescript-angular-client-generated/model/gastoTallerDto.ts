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
import { GastosTallerDocDto } from './gastosTallerDocDto';
import { ProveedorDto } from './proveedorDto';
import { ReferenciaMaterialDto } from './referenciaMaterialDto';

export interface GastoTallerDto { 
    id?: number;
    idEmpresa?: number;
    idCentro?: number;
    centro?: CentrosCosteDto;
    idProveedor?: number;
    proveedor?: ProveedorDto;
    fecha?: string;
    factura?: string;
    descripcion?: string;
    importe?: number;
    codMoneda?: string;
    cantidad?: number;
    gastoConmutable?: boolean;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
    gastosTallerDoc?: GastosTallerDocDto;
    idReferenciaMaterial?: number;
    referenciaMaterial?: ReferenciaMaterialDto;
}