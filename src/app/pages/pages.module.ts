import { NgModule } from '@angular/core';
import { PAGES_ROUTES } from './pages.routes';

import { SharedModule } from '../shared/shared.module';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { PagesComponent } from './pages.component';

import { PipesModule } from '../pipes/pipes.module';

import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { RecordLevelComponent } from './record-level/record-level.component';
import { OccurrenceComponent } from './occurrence/occurrence.component';
import { MaterialSampleComponent } from './material-sample/material-sample.component';
import { OrganismComponent } from './organism/organism.component';
import { EventComponent } from './event/event.component';
import { LocationComponent } from './location/location.component';
import { GeologicalContextComponent } from './geological-context/geological-context.component';
import { IdentificationComponent } from './identification/identification.component';
import { TaxonComponent } from './taxon/taxon.component';
import { MeasurementOrFactComponent } from './measurement-or-fact/measurement-or-fact.component';
import { ResourceRelationshipComponent } from './resource-relationship/resource-relationship.component';
import { ProfileComponent } from './profile/profile.component';

@NgModule({
    declarations: [
        PagesComponent,
        DashboardComponent,
        AccountSettingsComponent,
        RecordLevelComponent,
        OccurrenceComponent,
        MaterialSampleComponent,
        OrganismComponent,
        EventComponent,
        LocationComponent,
        GeologicalContextComponent,
        IdentificationComponent,
        TaxonComponent,
        MeasurementOrFactComponent,
        ResourceRelationshipComponent,
        ProfileComponent
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