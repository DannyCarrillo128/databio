import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalMenuService } from '../components/modal-menu/modal-menu.service';

import { 
    LoginGuardGuard,
    AdminGuard,
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    FotografiaService,
    ComentarioService,
    DarwinCoreService,
    VerificarTokenGuard
} from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        LoginGuardGuard,
        AdminGuard,
        SettingsService,
        SidebarService,
        SharedService,
        UsuarioService,
        FotografiaService,
        ComentarioService,
        DarwinCoreService,
        ModalMenuService,
        VerificarTokenGuard
    ],
    declarations: []
})
export class ServiceModule { }