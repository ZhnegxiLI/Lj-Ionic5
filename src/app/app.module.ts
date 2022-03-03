import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy, NavParams } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ApiInterceptor } from './ApiInterceptor';
import { UtilsService } from './common/utils.service';
import { JPush } from '@jiguang-ionic/jpush/ngx';
import { JpushService } from './common/jpush.service';
import { IonicSelectableModule } from 'ionic-selectable';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, IonicSelectableModule, BrowserAnimationsModule],
  providers: [
    UtilsService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    JPush,
    JpushService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
