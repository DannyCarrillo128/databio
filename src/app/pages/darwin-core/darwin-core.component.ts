import { Component, OnInit } from '@angular/core';
import { DarwinCoreService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';

@Component({
  selector: 'app-darwin-core',
  templateUrl: './darwin-core.component.html',
  styles: []
})
export class DarwinCoreComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _darwinCoreService: DarwinCoreService
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
    this._darwinCoreService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.registros = resp.darwinCores;
    });
  }


  buscarRegistro(termino: string) {
    if(termino.length <= 0) {
      this.cargarRegistros();
      return;
    }

    this._darwinCoreService.buscarRegistro(termino)
      .subscribe(registros => this.registros = registros);
  }

}