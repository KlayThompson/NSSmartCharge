import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {PileDetailComponent} from './pile-detail/pile-detail.component';
import {LoginGuard} from './guard/login.guard';
import {AppComponent} from './app.component';

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
          {path: '', redirectTo: '/login', pathMatch: 'full'},
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
