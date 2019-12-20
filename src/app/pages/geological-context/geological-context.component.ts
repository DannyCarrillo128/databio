import { Component, OnInit } from '@angular/core';
import { GeologicalContextService } from '../../services/service.index';
import { GeologicalContext } from 'src/app/models/geological-context.model';

@Component({
  selector: 'app-geological-context',
  templateUrl: './geological-context.component.html',
  styles: []
})
export class GeologicalContextComponent implements OnInit {

  registros: GeologicalContext[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _geologicalContextService: GeologicalContextService
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
    this._geologicalContextService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.geologicalContexts;
      });
  }

}