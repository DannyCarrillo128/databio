import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';
import { GalleryComponent } from './login/gallery/gallery.component';
import { AboutUsComponent } from './login/about-us/about-us.component';
import { HomeComponent } from './login/home/home.component';
import { NotfoundpageComponent } from './shared/notfoundpage/notfoundpage.component';

const appRoutes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'gallery', component: GalleryComponent },
    { path: 'aboutUs', component: AboutUsComponent },
    { path: 'home', component: HomeComponent },
    { path: '**', component: NotfoundpageComponent }
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true });