import { Component, OnInit } from '@angular/core';
import { OccurrenceService } from '../../services/service.index';
import { Occurrence } from '../../models/occurrence.model';

@Component({
  selector: 'app-occurrence',
  templateUrl: './occurrence.component.html',
  styles: []
})
export class OccurrenceComponent implements OnInit {

  registros: Occurrence[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _occurrenceService: OccurrenceService
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
    this._occurrenceService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.occurrences;
      });
  }

}