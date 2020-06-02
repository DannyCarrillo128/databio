import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';
import { ProfilesComponent } from './profile/profiles.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { SolicitudesComponent } from './solicitudes/solicitudes.component';
import { GalleryComponent } from './gallery/gallery.component';
import { PhotostreamComponent } from './gallery/photostream.component';
import { ConfiguracionComponent } from './gallery/configuracion.component';

// Darwin Core
import { DarwinCoreComponent } from './darwin-core/darwin-core.component';
import { GestionRegistrosComponent } from './darwin-core/gestion-registros.component';

import { LoginGuardGuard, AdminGuard } from '../services/service.index';
import { SolicitudComponent } from './solicitudes/solicitud.component';

const pagesRoutes: Routes = [
    { path: '', 
      component: PagesComponent, 
      canActivate: [ LoginGuardGuard ],
      children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
          { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
          { path: 'perfiles/:id', component: ProfilesComponent, data: { titulo: 'Perfil de Usuario' } },
          { path: 'usuarios', component: UsuariosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Usuarios' } },
          { path: 'solicitudes', component: SolicitudesComponent, canActivate: [ AdminGuard ], data: { titulo: 'Buzón' } },
          { path: 'solicitud/:id', component: SolicitudComponent, canActivate: [ AdminGuard ], data: { titulo: 'Solicitud' } },
          { path: 'gallery2', component: GalleryComponent, data: { titulo: 'Galería' } },
          { path: 'photostream/:id', component: PhotostreamComponent, data: { titulo: 'Galería' } },
          { path: 'configuracion', component: ConfiguracionComponent, canActivate: [ AdminGuard ], data: { titulo: 'Configuración' } },
          { path: 'darwinCore', component: DarwinCoreComponent, data: { titulo: 'Darwin Core' } },
          { path: 'darwinCore/:id', component: GestionRegistrosComponent, canActivate: [ AdminGuard ], data: { titulo: 'Gestión de Registros' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ] }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);