import {NgModule} from '@angular/core';
import {ToastService} from './toast.service';
import {LoginService} from './login.service';

@NgModule()
export class ServiceModule {
  static forRoot() {
    return {
      ngModule: ServiceModule,
      providers: [
        ToastService,
        LoginService
      ]
    };
  }
}
