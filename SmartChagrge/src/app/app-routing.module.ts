import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PileDetailComponent} from './pile-detail/pile-detail.component';
import {LoginGuard} from './guard/login.guard';
import {AppComponent} from './app.component';
import {PileChargingComponent} from './pile-charging/pile-charging.component';
import {UserCenterComponent} from './user-center/user-center.component';
import {OrderListComponent} from './order-list/order-list.component';
import {PileHistoryDetailComponent} from './order-list/pile-history-detail/pile-history-detail.component';
import {PayTypeComponent} from './pay-type/pay-type.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
    canActivate: [LoginGuard],
    children: [
      {
        path: '',
        children: [
          {path: 'home', component: HomeComponent},
          {path: 'login', component: LoginComponent},
          {path: 'pileInfo', component: PileDetailComponent},
          {path: 'pileCharging', component: PileChargingComponent},
          {path: 'user', component: UserCenterComponent},
          {path: 'orderList', component: OrderListComponent},
          {path: 'pileOrderDetail', component: PileHistoryDetailComponent},
          {path: 'payType', component: PayTypeComponent},
          {path: '', redirectTo: '/home', pathMatch: 'full'},
        ]
      }
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: [LoginGuard]
})
export class AppRoutingModule { }
