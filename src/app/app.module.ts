import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Rutas
import { APP_ROUTES } from './app.routes';

// Módulos
import { PipesModule } from './pipes/pipes.module';
import { SharedModule } from './shared/shared.module';

// Formularios
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Servicios
import { ServiceModule } from './services/service.module';

import { BarRatingModule } from 'ngx-bar-rating';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { HomeComponent } from './login/home/home.component';
import { GalleryComponent } from './login/gallery/gallery.component';
import { AboutUsComponent } from './login/about-us/about-us.component';
import { TermsAndConditionsComponent } from './login/terms-and-conditions/terms-and-conditions.component';
import { PagesComponent } from './pages/pages.component';
import { PhotostreamComponent } from './login/gallery/photostream.component';
import { RecoverPasswordComponent } from './login/recover-password.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    GalleryComponent,
    AboutUsComponent,
    TermsAndConditionsComponent,
    PagesComponent,
    PhotostreamComponent,
    RecoverPasswordComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    APP_ROUTES,
    FormsModule,
    ReactiveFormsModule,
    ServiceModule,
    PipesModule,
    SharedModule,
    BarRatingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }