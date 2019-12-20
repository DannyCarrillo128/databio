import { Component, OnInit } from '@angular/core';
import { TaxonService } from '../../services/service.index';
import { Taxon } from '../../models/taxon.model';

@Component({
  selector: 'app-taxon',
  templateUrl: './taxon.component.html',
  styles: []
})
export class TaxonComponent implements OnInit {

  registros: Taxon[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _taxonService: TaxonService
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
    this._taxonService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.registros = resp.taxons;
    });
  }

}
