import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GeolocationService } from './services/geolocation.service';
import { IonicStorageModule } from '@ionic/storage';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    IonicStorageModule.forRoot()
  ],
  exports: [

  ],
  providers: [GeolocationService],
  bootstrap: [AppComponent]
})
export class AppModule { }
