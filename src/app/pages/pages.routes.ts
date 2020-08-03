import { RouterModule, Routes } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { BusquedaComponent } from './busqueda/busqueda.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profile/profiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotostreamComponent } from './gallery/photostream.component';
import { ConfiguracionComponent } from './gallery/configuracion.component';
import { GestionCamaraComponent } from './gallery/gestion-camara.component';

// Darwin Core
import { DarwinCoreComponent } from './darwin-core/darwin-core.component';
import { GestionRegistrosComponent } from './darwin-core/gestion-registros.component';
import { DetalleRegistroComponent } from './darwin-core/detalle-registro.component';

import { AdminGuard, VerificarTokenGuard } from '../services/service.index';
import { SolicitudComponent } from './solicitudes/solicitud.component';

const pagesRoutes: Routes = [
    { path: 'dashboard', component: DashboardComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Dashboard' } },
    { path: 'account-settings', component: AccountSettingsComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Ajustes del Tema' } },
    { path: 'busqueda/:termino', component: BusquedaComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Búsqueda' } },
    { path: 'perfil', component: ProfileComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Perfil de Usuario' } },
    { path: 'perfiles/:id', component: ProfilesComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Perfil de Usuario' } },
    { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Usuarios' } },
    { path: 'solicitudes', component: SolicitudesComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Buzón' } },
    { path: 'solicitud/:id', component: SolicitudComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Solicitud' } },
    { path: 'gallery2', component: GalleryComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Galería' } },
    { path: 'photostream2/:id', component: PhotostreamComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Galería' } },
    { path: 'configuracion', component: ConfiguracionComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Configuración' } },
    { path: 'camara/:id', component: GestionCamaraComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Cámara' } },
    { path: 'darwinCore', component: DarwinCoreComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Darwin Core' } },
    { path: 'darwinCore/:id', component: GestionRegistrosComponent, canActivate: [ AdminGuard, VerificarTokenGuard ], data: { titulo: 'Gestión de Registros' } },
    { path: 'detalle/:id', component: DetalleRegistroComponent, canActivate: [ VerificarTokenGuard ], data: { titulo: 'Darwin Core' } },
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);