import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Comentario } from '../../models/comentario.model';

@Injectable({
  providedIn: 'root'
})
export class ComentarioService {

  comentario: Comentario;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarRegistros(desde: number = 0) {
    let url = URL_SERVICIOS + '/comentario?desde=' + desde;

    return this.http.get(url);
  }


  obtenerRegistro(id: string) {
    let url = URL_SERVICIOS + '/comentario/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.comentario)
    );
  }


  eliminarRegistro(id: string) {
    let url = URL_SERVICIOS + '/comentario/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  guardarRegistro(comentario: Comentario) {
    let url = URL_SERVICIOS + '/comentario';

    if(comentario._id) {
      // Actualizar
      url += '/' + comentario._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, comentario).pipe(
        map((resp: any) => {
          return resp.comentario;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, comentario).pipe(
        map((resp: any) => {
          return resp.comentario;
        }));
    }
  }

}