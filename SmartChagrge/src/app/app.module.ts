import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {ToastaModule} from 'ngx-toasta';
import { PileDetailComponent } from './pile-detail/pile-detail.component';
import { PileChargingComponent } from './pile-charging/pile-charging.component';
import { UserCenterComponent } from './user-center/user-center.component';
import { OrderListComponent } from './order-list/order-list.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PileHistoryComponent } from './order-list/pile-history/pile-history.component';
import { PileHistoryDetailComponent } from './order-list/pile-history-detail/pile-history-detail.component';
import { PayTypeComponent } from './pay-type/pay-type.component';
import {NgxAmapModule} from 'ngx-amap';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    PileDetailComponent,
    PileChargingComponent,
    UserCenterComponent,
    OrderListComponent,
    PileHistoryComponent,
    PileHistoryDetailComponent,
    PayTypeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    CoreModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    ToastaModule.forRoot(),
    NgxAmapModule.forRoot({
      apiKey: 'ea449bb1e5e76cd10e57990bb126fdb1'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
