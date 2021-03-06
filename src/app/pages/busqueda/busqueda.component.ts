import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Usuario } from '../../models/usuario.model';
import { DarwinCore } from '../../models/darwin-core.model';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: []
})
export class BusquedaComponent implements OnInit {

  registros: DarwinCore[] = [];
  usuarios: Usuario[] = [];

  constructor(
    public activatedRoute: ActivatedRoute,
    public http: HttpClient
  ) {
    activatedRoute.params
      .subscribe(params => {
        let termino = params['termino'];
        this.buscar(termino);
      });
  }

  ngOnInit() {
  }


  buscar(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/todo/' + termino;

    this.http.get(url)
      .subscribe((resp: any) => {
        this.registros = resp.darwinCores;
        this.usuarios = resp.usuarios;
      });
  }

}