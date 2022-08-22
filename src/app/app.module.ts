import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
 
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
 
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { SectionsComponent } from './sections/sections.component';
import { SectionPopoverComponent } from './section-popover/section-popover.component';
import { SectionDetailsComponent } from './section-details/section-details.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { AngularFireModule } from '@angular/fire'; 
import { AngularFirestoreModule, FirestoreSettingsToken } from '@angular/fire/firestore';
import { SectionModalComponent } from './section-modal/section-modal.component';
import { TeacherModalComponent } from './teacher-modal/teacher-modal.component';
import { OfferModalComponent } from './offer-modal/offer-modal.component';
import { ImgModalComponent } from './img-modal/img-modal.component';
import {  AngularFireStorageModule } from '@angular/fire/storage';
import { LoginComponent } from './login/login.component';
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [AppComponent,
  SectionsComponent,SectionPopoverComponent,SectionDetailsComponent,DashboardComponent,SectionModalComponent,TeacherModalComponent,OfferModalComponent,ImgModalComponent,LoginComponent],
  entryComponents: [SectionPopoverComponent],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireStorageModule

  ],
  bootstrap: [AppComponent],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: FirestoreSettingsToken, useValue: {} }
  ]
 
})
export class AppModule {}
