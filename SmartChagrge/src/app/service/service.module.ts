import {NgModule} from '@angular/core';

@NgModule()
export class ServiceModule {
  static forRoot() {
    return {
      ngModule: ServiceModule,
      providers: [
      ]
    };
  }
}
