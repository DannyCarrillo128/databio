import { HttpClientModule } from '@angular/common/http';
import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';

import { 
    SettingsService,
    SidebarService,
    SharedService,
    LoginGuardGuard,
    UsuarioService,
    RecordLevelService,
    OccurrenceService,
    OrganismService,
    MaterialSampleService,
    EventService,
    LocationService,
    GeologicalContextService,
    IdentificationService,
    TaxonService,
    MeasurementOrFactService,
    ResourceRelationshipService
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
        RecordLevelService,
        OccurrenceService,
        OrganismService,
        MaterialSampleService,
        EventService,
        LocationService,
        GeologicalContextService,
        IdentificationService,
        TaxonService,
        MeasurementOrFactService,
        ResourceRelationshipService
    ],
    declarations: []
})
export class ServiceModule { }