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
import { TacografoDto } from './tacografoDto';

export interface TacografosDocOneDto { 
    claveGuid?: string;
    idTacografo?: number;
    tacografo?: TacografoDto;
    extension?: string;
    documento?: ByteReadOnlyMemory;
    nombre?: string;
}