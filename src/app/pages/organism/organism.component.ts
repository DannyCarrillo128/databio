import { Component, OnInit } from '@angular/core';
import { OrganismService } from 'src/app/services/service.index';
import { Organism } from 'src/app/models/organism.model';

@Component({
  selector: 'app-organism',
  templateUrl: './organism.component.html',
  styles: []
})
export class OrganismComponent implements OnInit {

  registros: Organism[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _organismService: OrganismService
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
    this._organismService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.organisms;
      });
  }

}