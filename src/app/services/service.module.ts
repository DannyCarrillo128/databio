import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

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
        DarwinCoreService
    ],
    declarations: []
})
export class ServiceModule { }