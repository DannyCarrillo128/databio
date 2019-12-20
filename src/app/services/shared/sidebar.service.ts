import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Darwin Core',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Dashboard', url: '/dashboard' },
        { titulo: 'Record-Level', url: '/record-level' },
        { titulo: 'Occurrence', url: '/occurrence' },
        { titulo: 'Organism', url: '/organism' },
        { titulo: 'MaterialSample', url: '/materialSample' },
        { titulo: 'Event', url: '/event' },
        { titulo: 'Location', url: '/location' },
        { titulo: 'GeologicalContext', url: '/geologicalContext' },
        { titulo: 'Identification', url: '/identification' },
        { titulo: 'Taxon', url: '/taxon' },
        { titulo: 'MeasurementOrFact', url: '/measurementOrFact' },
        { titulo: 'ResourceRelationship', url: '/resourceRelationship' }
      ]
    }
  ];

  constructor() { }
}