import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PipesModule } from '../pipes/pipes.module';

import { BarRatingModule } from 'ngx-bar-rating';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { GalleryComponent } from './gallery/gallery.component';
import { DarwinCoreComponent } from './darwin-core/darwin-core.component';
import { PhotostreamComponent } from './gallery/photostream.component';
import { GestionCamaraComponent } from './gallery/gestion-camara.component';
import { ProfilesComponent } from './profile/profiles.component';
import { GestionRegistrosComponent } from './darwin-core/gestion-registros.component';
import { ModalMenuComponent } from '../components/modal-menu/modal-menu.component';
import { ConfiguracionComponent } from './gallery/configuracion.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { SolicitudComponent } from './solicitudes/solicitud.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { DetalleRegistroComponent } from './darwin-core/detalle-registro.component';
import { ChartsModule } from '../charts/charts.module';

@NgModule({
    declarations: [
        DashboardComponent,
        AccountSettingsComponent,
        ProfileComponent,
        UsuariosComponent,
        GalleryComponent,
        DarwinCoreComponent,
        PhotostreamComponent,
        ConfiguracionComponent,
        GestionCamaraComponent,
        ProfilesComponent,
        GestionRegistrosComponent,
        SolicitudesComponent,
        SolicitudComponent,
        DetalleRegistroComponent,
        BusquedaComponent
    ],
    exports: [
        DashboardComponent
    ],
    imports: [
        CommonModule,
        SharedModule,
        PAGES_ROUTES,
        FormsModule,
        PipesModule,
        ChartsModule,
        BarRatingModule
    ]
})
export class PagesModule { }