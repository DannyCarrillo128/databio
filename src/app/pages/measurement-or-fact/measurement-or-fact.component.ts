import { Component, OnInit } from '@angular/core';
import { MeasurementOrFactService } from '../../services/service.index';
import { MeasurementOrFact } from '../../models/measurement-or-fact.model';

@Component({
  selector: 'app-measurement-or-fact',
  templateUrl: './measurement-or-fact.component.html',
  styles: []
})
export class MeasurementOrFactComponent implements OnInit {

  registros: MeasurementOrFact[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _measurementOrFactService: MeasurementOrFactService
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
    this._measurementOrFactService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.measurementOrFacts;
      });
  }

}