import { Component, OnInit } from '@angular/core';
import { IdentificationService } from '../../services/service.index';
import { Identification } from '../../models/identification.model';

@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styles: []
})
export class IdentificationComponent implements OnInit {

  registros: Identification[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _identificationService: IdentificationService
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
    this._identificationService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.identifications;
      });
  }

}