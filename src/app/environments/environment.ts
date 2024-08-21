// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  msalConfig: {
      auth: {
          clientId:  "bfe4de94-041a-4479-a959-9877a5861254",
          authority:  "https://login.microsoftonline.com/9133aec2-7cdd-4b6f-a5cc-65e7eb1384ec/",
      }
  },
  apiConfig: {
    scopes: ['User.read'],
    uri: ''
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
