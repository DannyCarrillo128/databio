import { Component, OnInit } from '@angular/core';
import { Location } from '../../models/location.model';
import { LocationService } from '../../services/service.index';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styles: []
})
export class LocationComponent implements OnInit {

  registros: Location[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _locationService: LocationService
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
    this._locationService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.locations;
      });
  }

}