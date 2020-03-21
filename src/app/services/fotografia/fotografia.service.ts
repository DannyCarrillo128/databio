import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Fotografia } from '../../models/fotografia.model';

@Injectable({
  providedIn: 'root'
})
export class FotografiaService {

  fotografia: Fotografia;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarRegistros(desde: number = 0) {
    let url = URL_SERVICIOS + '/fotografia?desde=' + desde;

    return this.http.get(url);
  }


  obtenerRegistro(id: string) {
    let url = URL_SERVICIOS + '/fotografia/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.fotografia)
    );
  }


  eliminarRegistro(id: string) {
    let url = URL_SERVICIOS + '/fotografia/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  buscaRegistro(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/fotografias/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.fotografias)
    );
  }


  guardarRegistro(fotografia: Fotografia) {
    let url = URL_SERVICIOS + '/fotografia';

    if(fotografia._id) {
      // Actualizar
      url += '/' + fotografia._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, fotografia).pipe(
        map((resp: any) => {
          return resp.fotografia;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, fotografia).pipe(
        map((resp: any) => {
          return resp.fotografia;
        }));
    }
  }


  eliminarComentario(fotografia: Fotografia, comentario: string) {
    let url = URL_SERVICIOS + '/fotografia/' + fotografia._id + '/' + comentario + '?token=' + this._usuarioService.token;

    return this.http.put(url, fotografia).pipe(
      map((resp: any) => resp.fotografia)
    );
  }

}