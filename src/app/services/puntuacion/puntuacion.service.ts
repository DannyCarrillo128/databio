import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { UsuarioService } from '../usuario/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Comentario } from '../../models/comentario.model';
import { Puntuacion } from '../../models/puntuacion.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PuntuacionService {

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  obtenerPromedio(comentario: Comentario) {
    let url = URL_SERVICIOS + '/puntuacion/' + comentario._id;

    return this.http.get(url);
  }


  obtenerPuntuacion(comentario: Comentario, calificador: Usuario) {
    let url = URL_SERVICIOS + '/puntuacion/' + comentario._id + '/' + calificador._id;

    return this.http.get(url);
  }


  actualizarCalificacion(puntuacion: Puntuacion) {
    let url = URL_SERVICIOS + '/puntuacion/' + puntuacion.comentario + '/' + puntuacion.calificador + '?token=' + this._usuarioService.token;

    return this.http.put(url, puntuacion).pipe(
      map((resp: any) => {
        return resp.puntuacion;
      }));
  }


  crearCalificacion(puntuacion: Puntuacion) {
    let url = URL_SERVICIOS + '/puntuacion?token=' + this._usuarioService.token;

    return this.http.post(url, puntuacion).pipe(
      map((resp: any) => {
        return resp.puntuacion;
      }));
  }
  
}