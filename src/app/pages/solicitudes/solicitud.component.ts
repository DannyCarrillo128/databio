import { Component, OnInit } from '@angular/core';
import { UsuarioService, MailerService } from '../../services/service.index';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-solicitud',
  templateUrl: './solicitud.component.html',
  styles: []
})
export class SolicitudComponent implements OnInit {

  usuario: Usuario = new Usuario('', '', '');

  constructor(
    public _usuarioService: UsuarioService,
    public _mailerService: MailerService,
    public activatedRoute: ActivatedRoute,
    public router: Router
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarUsuario(id);
    });
  }

  ngOnInit() {
  }


  cargarUsuario(id: string) {
    this._usuarioService.obtenerUsuario(id)
      .subscribe(usuario => {
        this.usuario = usuario;
      });
  }


  aceptar(activar: boolean) { 
    if (activar) {
      this.usuario.estado = 'Verificado';
      this._usuarioService.actualizarUsuario(this.usuario)
        .subscribe(resp => {
          this._mailerService.enviarConfirmacion({ nombre: this.usuario.nombre, email: this.usuario.email }).subscribe();
          this.router.navigate(['/solicitudes']);
      });
    } else {
      this._usuarioService.borrarUsuario(this.usuario._id)
        .subscribe(resp => this.router.navigate(['/solicitudes']));
    }
  }

}