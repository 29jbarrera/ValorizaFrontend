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
import { ByteReadOnlyMemory } from './byteReadOnlyMemory';

export interface GncsDocOneDto { 
    claveGuid?: string;
    idGnc?: number;
    documento?: ByteReadOnlyMemory;
    nombre?: string;
    extension?: string;
    createdBy?: string;
    createdAt?: Date;
    changedBy?: string;
    changedAt?: Date;
}