import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';
import Swal from 'sweetalert2';

declare function init_modals();

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styles: []
})
export class ProfileComponent implements OnInit {

  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    init_modals();
  }


  guardar(usuario: Usuario) {
    this.usuario.nombre = usuario.nombre;
    this.usuario.telefono = usuario.telefono;
    this.usuario.interes = usuario.interes;
    this.usuario.ocupacion = usuario.ocupacion;
    this.usuario.institucion = usuario.institucion;

    if(!this.usuario.google) {
      this.usuario.email = usuario.email;
    }

    this._usuarioService.actualizarUsuario(this.usuario)
      .subscribe();
  }


  seleccionImagen(archivo: File) {
    if(!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo se permiten imágenes', '', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }


  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir, this.usuario._id);
  }

}