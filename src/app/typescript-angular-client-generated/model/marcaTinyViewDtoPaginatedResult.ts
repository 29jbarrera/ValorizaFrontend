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
import { MarcaTinyViewDto } from './marcaTinyViewDto';

export interface MarcaTinyViewDtoPaginatedResult { 
    hasNext?: boolean;
    hasPrev?: boolean;
    total?: number;
    page?: number;
    perPage?: number;
    pages?: number;
    results?: Array<MarcaTinyViewDto>;
}