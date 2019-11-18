import {NgModule} from '@angular/core';
import {ToastService} from './toast.service';

@NgModule()
export class ServiceModule {
  static forRoot() {
    return {
      ngModule: ServiceModule,
      providers: [
        ToastService
      ]
    };
  }
}
