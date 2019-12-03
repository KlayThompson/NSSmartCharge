import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ServiceModule} from '../service/service.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AppRoutingModule} from '../app-routing.module';
import {MatButtonModule, MatDividerModule, MatIconModule, MatListModule, MatTabsModule} from '@angular/material';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
    ServiceModule.forRoot(),
    AppRoutingModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  exports: [
    MatTabsModule,
    MatListModule,
    MatIconModule,
    MatDividerModule,
    MatButtonModule
  ],
  providers: [
    {
      provide: 'BASE_CONFIG',
      useValue: {
        uri: 'http://139.198.176.116:12333',  // dev
        appKey: 'UtOCzqb67d3sN12Kts4URwy8',
        appId: '123',
        wxAppId: 'wx81406d42b4c87662',
        wxAppSecret: 'fe1c1f3282d0cb025d459880be71dae3'
      }
    }
  ]
})
export class CoreModule { }
