import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { ActivatedRoute } from '@angular/router';
import { Usuario } from '../../models/usuario.model';
import { Location } from '@angular/common';

@Component({
  selector: 'app-profiles',
  templateUrl: './profiles.component.html',
  styles: []
})
export class ProfilesComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '');

  constructor(
    public _usuarioService: UsuarioService,
    public activatedRoute: ActivatedRoute,
    private location: Location
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarUsuario(id);
    });
  }

  ngOnInit() {
  }


  goBack() {
    this.location.back();
  }


  cargarUsuario(id: string) {
    this._usuarioService.obtenerUsuario(id)
      .subscribe(usuario => {
        this.usuario = usuario;
      });
  }

}
