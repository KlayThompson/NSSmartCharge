import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ServiceModule} from '../service/service.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ServiceModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        // uri: 'http://172.16.1.2:4201/aycharge'  // dev
        uri: 'http://tapp.anyocharging.com:4201/aycharge'  // test
        // uri: 'http://10.135.66.38:4201/aycharge'  // stage
        // uri: 'http://ndzd.anyocharging.com:4201/aycharge'  // production
      }
    }
  ]
})
export class CoreModule { }
