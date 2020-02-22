import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { ModalMenuService } from '../components/modal-menu/modal-menu.service';

import { 
    SettingsService,
    SidebarService,
    SharedService,
    LoginGuardGuard,
    UsuarioService,
    DarwinCoreService
} from './service.index';

@NgModule({
    imports: [
        CommonModule,
        HttpClientModule
    ],
    providers: [
        SettingsService,
        SidebarService,
        SharedService,
        LoginGuardGuard,
        UsuarioService,
        DarwinCoreService,
        ModalMenuService
    ],
    declarations: []
})
export class ServiceModule { }