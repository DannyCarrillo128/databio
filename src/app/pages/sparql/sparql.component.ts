import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { SparqlService } from 'src/app/services/service.index';

@Component({
  selector: 'app-sparql',
  templateUrl: './sparql.component.html',
  styles: []
})
export class SparqlComponent implements OnInit {

  registros: any[] = [];
  ocultar: boolean = false;

  constructor(
    public _sparqlService: SparqlService
  ) { }

  ngOnInit() {
  }


  ejecutar(f: NgForm) {
    this._sparqlService.query(f.value.query)
      .subscribe((res: any) => {
        console.log(res.results.bindings);
        this.ocultar = true;
        this.registros = res.results.bindings;
      });
  }

}