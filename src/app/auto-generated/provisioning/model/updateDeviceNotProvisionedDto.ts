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

export interface UpdateDeviceNotProvisionedDto { 
    id: number;
    deviceUniqueId: string;
    registerAt: Date;
    invocationDefinitionId: number;
    idExternalService: number;
    httpServiceTypeId: number;
    invocationDefinitionName: string;
    externalServiceHttpServiceType: string;
    externalServiceAvailableDriver: string;
    state: number;
    guid: string;
    permission: number;
}