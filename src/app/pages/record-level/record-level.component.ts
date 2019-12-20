import { Component, OnInit } from '@angular/core';
import { RecordLevelService } from '../../services/service.index';
import { RecordLevel } from '../../models/record-level.model';

@Component({
  selector: 'app-record-level',
  templateUrl: './record-level.component.html',
  styles: []
})
export class RecordLevelComponent implements OnInit {

  registros: RecordLevel[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _recordLevelService: RecordLevelService
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
    this._recordLevelService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.registros = resp.recordLevels;
    });
  }

}