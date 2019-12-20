import { RouterModule, Routes } from '@angular/router';

import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { ProfileComponent } from './profile/profile.component';

// Darwin Core
import { RecordLevelComponent } from './record-level/record-level.component';
import { OccurrenceComponent } from './occurrence/occurrence.component';
import { OrganismComponent } from './organism/organism.component';
import { MaterialSampleComponent } from './material-sample/material-sample.component';
import { EventComponent } from './event/event.component';
import { LocationComponent } from './location/location.component';
import { GeologicalContextComponent } from './geological-context/geological-context.component';
import { IdentificationComponent } from './identification/identification.component';
import { TaxonComponent } from './taxon/taxon.component';
import { MeasurementOrFactComponent } from './measurement-or-fact/measurement-or-fact.component';
import { ResourceRelationshipComponent } from './resource-relationship/resource-relationship.component';

import { LoginGuardGuard } from '../services/service.index';

const pagesRoutes: Routes = [
    { path: '', 
      component: PagesComponent, 
      canActivate: [ LoginGuardGuard ],
      children: [
          { path: 'dashboard', component: DashboardComponent, data: { titulo: 'Dashboard' } },
          { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes del Tema' } },
          { path: 'perfil', component: ProfileComponent, data: { titulo: 'Perfil de Usuario' } },
          { path: 'record-level', component: RecordLevelComponent, data: { titulo: 'Record-Level' } },
          { path: 'occurrence', component: OccurrenceComponent, data: { titulo: 'Occurrence' } },
          { path: 'organism', component: OrganismComponent, data: { titulo: 'Organism' } },
          { path: 'materialSample', component: MaterialSampleComponent, data: { titulo: 'MaterialSample' } },
          { path: 'event', component: EventComponent, data: { titulo: 'Event' } },
          { path: 'location', component: LocationComponent, data: { titulo: 'Location' } },
          { path: 'geologicalContext', component: GeologicalContextComponent, data: { titulo: 'GeologicalContext' } },
          { path: 'identification', component: IdentificationComponent, data: { titulo: 'Identification' } },
          { path: 'taxon', component: TaxonComponent, data: { titulo: 'Taxon' } },
          { path: 'measurementOrFact', component: MeasurementOrFactComponent, data: { titulo: 'MeasurementOrFact' } },
          { path: 'resourceRelationship', component: ResourceRelationshipComponent, data: { titulo: 'ResourceRelationship' } },
          { path: '', redirectTo: '/dashboard', pathMatch: 'full' }
    ] }
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);