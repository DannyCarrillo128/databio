import { Component, OnInit } from '@angular/core';
import { ResourceRelationshipService } from '../../services/service.index';
import { ResourceRelationship } from '../../models/resource-relationship.model';

@Component({
  selector: 'app-resource-relationship',
  templateUrl: './resource-relationship.component.html',
  styles: []
})
export class ResourceRelationshipComponent implements OnInit {

  registros: ResourceRelationship[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _resourceRelationshipService: ResourceRelationshipService
  ) { }

  ngOnInit() {
    this.cargarRegistros();
  }


  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros) {
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarRegistros();
  }
  

  cargarRegistros() {
    this._resourceRelationshipService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.registros = resp.resourceRelationships;
    });
  }

}