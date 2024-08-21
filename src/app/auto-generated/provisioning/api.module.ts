import { NgModule, ModuleWithProviders, SkipSelf, Optional } from '@angular/core';
import { Configuration } from './configuration';
import { HttpClient } from '@angular/common/http';


import { AzureFunctionsService } from './api/azureFunctions.service';
import { DevicesService } from './api/devices.service';
import { DevicesExternalServicesService } from './api/devicesExternalServices.service';
import { DevicesLocationsService } from './api/devicesLocations.service';
import { DevicesNotProvisionedService } from './api/devicesNotProvisioned.service';
import { ExternalServicesService } from './api/externalServices.service';
import { ServiceApiProvidersService } from './api/serviceApiProviders.service';
import { TrackingService } from './api/tracking.service';

@NgModule({
  imports:      [],
  declarations: [],
  exports:      [],
  providers: [
    AzureFunctionsService,
    DevicesService,
    DevicesExternalServicesService,
    DevicesLocationsService,
    DevicesNotProvisionedService,
    ExternalServicesService,
    ServiceApiProvidersService,
    TrackingService ]
})
export class ApiModule {
    public static forRoot(configurationFactory: () => Configuration): ModuleWithProviders<ApiModule> {
        return {
            ngModule: ApiModule,
            providers: [ { provide: Configuration, useFactory: configurationFactory } ]
        };
    }

    constructor( @Optional() @SkipSelf() parentModule: ApiModule,
                 @Optional() http: HttpClient) {
        if (parentModule) {
            throw new Error('ApiModule is already loaded. Import in your base AppModule only.');
        }
        if (!http) {
            throw new Error('You need to import the HttpClientModule in your AppModule! \n' +
            'See also https://github.com/angular/angular/issues/20575');
        }
    }
}
