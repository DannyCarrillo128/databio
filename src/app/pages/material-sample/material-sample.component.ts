import { Component, OnInit } from '@angular/core';
import { MaterialSampleService } from '../../services/service.index';
import { MaterialSample } from '../../models/material-sample.model';

@Component({
  selector: 'app-material-sample',
  templateUrl: './material-sample.component.html',
  styles: []
})
export class MaterialSampleComponent implements OnInit {

  registros: MaterialSample[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _materialSampleService: MaterialSampleService
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
    this._materialSampleService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.materialSamples;
      });
  }

}