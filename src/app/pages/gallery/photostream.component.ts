import { Component, OnInit } from '@angular/core';
import { DarwinCoreService, UsuarioService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { DarwinCore } from '../../models/darwin-core.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-photostream',
  templateUrl: './photostream.component.html',
  styles: []
})
export class PhotostreamComponent implements OnInit {

  registro: DarwinCore = new DarwinCore();
  usuario: Usuario;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _usuarioService: UsuarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarRegistro(id);
    });
  }

  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
  }


  cargarRegistro(id: string) {
    this._darwinCoreService.obtenerRegistro(id)
      .subscribe(darwinCore => this.registro = darwinCore);
  }


  asignarNombre(subgenus: string, infraspecificEpithet: string, vernacularName: string) {
    let nombre = "";

    if(subgenus != "Sin especificar") {
      nombre += subgenus + " ";
    }

    if(infraspecificEpithet != "Sin especificar") {
      nombre += infraspecificEpithet + " ";
    }

    if(vernacularName != "Sin especificar") {
      nombre += vernacularName;
    }

    return nombre;
  }


  obtenerAnterior(id: string) {
    this._darwinCoreService.obtenerAnterior(id)
      .subscribe(darwinCore => this.router.navigate(['/photostream', darwinCore._id]));
  }


  obtenerSiguiente(id: string) {
    this._darwinCoreService.obtenerSiguiente(id)
    .subscribe(darwinCore => this.router.navigate(['/photostream', darwinCore._id]));
  }

}