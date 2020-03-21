import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DarwinCoreComponent } from './darwin-core/darwin-core.component';
import { PhotostreamComponent } from './gallery/photostream.component';
import { ProfilesComponent } from './profile/profiles.component';
import { GestionRegistrosComponent } from './darwin-core/gestion-registros.component';
import { ModalMenuComponent } from '../components/modal-menu/modal-menu.component';
import { ConfiguracionComponent } from './gallery/configuracion.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        GalleryComponent,
        DarwinCoreComponent,
        PhotostreamComponent,
        ProfilesComponent,
        GestionRegistrosComponent,
        ModalMenuComponent,
        ConfiguracionComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule
    ]
})
export class PagesModule { }