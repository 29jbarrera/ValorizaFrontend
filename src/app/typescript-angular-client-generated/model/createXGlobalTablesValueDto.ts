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
import { CreateXGlobalTablesValuesLangDto } from './createXGlobalTablesValuesLangDto';

export interface CreateXGlobalTablesValueDto { 
    code: string;
    codeApp: string;
    name: string;
    idOriginSession: number;
    modifiable: boolean;
    validFrom?: string;
    validTo?: string;
    order?: number;
    langs?: Array<CreateXGlobalTablesValuesLangDto>;
}