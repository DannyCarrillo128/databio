import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';

@Component({
  selector: 'app-solicitudes',
  templateUrl: './solicitudes.component.html',
  styles: []
})
export class SolicitudesComponent implements OnInit {

  usuarios: Usuario[] = [];

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this._usuarioService.buscarUsuarios('No verificado')
      .subscribe(usuarios => this.usuarios = usuarios);
  }

}