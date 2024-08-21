import { Injectable } from '@angular/core';
import {
  DeviceNotProvisionedDto,
  DevicesNotProvisionedService,
  UpdateDeviceNotProvisionedDto,
} from '@valoriza/web-provisioning';
import { lastValueFrom } from 'rxjs';

import { randPastDate, randUuid } from '@ngneat/falso';
@Injectable({
  providedIn: 'root',
})
export class GatewaysNotProvisionedService {
  constructor(
    private devicesNotProvisionedService: DevicesNotProvisionedService
  ) {}

  async get(): Promise<DeviceNotProvisionedDto[]> {
    // const response = await lastValueFrom(
    //   this.devicesNotProvisionedService.apiFeaturesV1DevicesNotProvisionedGet()
    // );

    // return response.results || [];

    const arr = new Array(Math.round(Math.random() * 100)).fill(0);
    console.log('arr', arr)
    return arr.map((_, index) => {
      return {
        changedAt: randPastDate(),
        changedBy: 'changedBy',
        createdAt: randPastDate(),
        createdBy: 'createdBy',
        deviceId: randUuid(),
        deletedAt: randPastDate(),
        deletedBy: 'deletedBy',
        deviceUniqueId: randUuid(),
        externalServiceAvailableDriver: 'externalServiceAvailableDriver',
        externalServiceAvailableVehicle: 'externalServiceAvailableVehicle',
        externalServiceHttpServiceType: 'externalServiceHttpServiceType',
        guid: randUuid(),
        httpServiceTypeId: 10,
        id: index,
        idExternalService: 0,
        invocationDefinitionId: 0,
        invocationDefinitionName: 'invocationDefinitionName',
        permissionId: randUuid(),
        permission: 0,
        registerAt: randPastDate(),
        state: 0,
      };
    });
  }

  async edit(body: UpdateDeviceNotProvisionedDto) {
    await lastValueFrom(
      this.devicesNotProvisionedService.apiFeaturesV1DevicesNotProvisionedPut(
        body
      )
    );
  }
}
