/**
 * Valoriza IoT API
 * No description provided (generated by Swagger Codegen https://github.com/swagger-api/swagger-codegen)
 *
 * OpenAPI spec version: v1
 * 
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 */
import { DeviceNotProvisionedDto } from './deviceNotProvisionedDto';

export interface DeviceNotProvisionedDtoPagedResultDto { 
    hasNext?: boolean;
    hasPrev?: boolean;
    total?: number;
    actualPage?: number;
    pageSize?: number;
    pages?: number;
    results?: Array<DeviceNotProvisionedDto>;
}