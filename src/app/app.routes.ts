import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages/pages.component';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { GalleryComponent } from './login/gallery/gallery.component';
import { PhotostreamComponent } from './login/gallery/photostream.component';
import { AboutUsComponent } from './login/about-us/about-us.component';
import { TermsAndConditionsComponent } from './login/terms-and-conditions/terms-and-conditions.component';
import { HomeComponent } from './login/home/home.component';
import { NotfoundpageComponent } from './shared/notfoundpage/notfoundpage.component';
import { LoginGuardGuard } from './services/guards/login-guard.guard';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'photostream/:id', component: PhotostreamComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'termsAndConditions', component: TermsAndConditionsComponent },
    { path: 'home', component: HomeComponent },
    { path: '', component: PagesComponent, canActivate: [ LoginGuardGuard ], loadChildren: './pages/pages.module#PagesModule'},
    { path: '**', component: NotfoundpageComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });