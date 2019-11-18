import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from '@angular/forms';
import {CoreModule} from './core/core.module';
import {NgxLoadingModule} from 'ngx-loading';
import {ToastaModule} from '../../projects/ngx-toasta/src/lib/toasta.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    NgxLoadingModule.forRoot({
      fullScreenBackdrop: true
    }),
    ToastaModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
