import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Metadato } from '../../models/metadato.model';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class MetadatoService {

  metadato: Metadato;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }


  cargarRegistros(desde: number = 0) {
    let url = URL_SERVICIOS + '/metadato?desde=' + desde;

    return this.http.get(url);
  }


  obtenerRegistro(id: string) {
    let url = URL_SERVICIOS + '/metadato/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.metadato)
    );
  }


  eliminarRegistro(id: string) {
    let url = URL_SERVICIOS + '/metadato/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  guardarRegistro(metadato: Metadato) {
    let url = URL_SERVICIOS + '/metadato';

    if(metadato._id) {
      // Actualizar
      url += '/' + metadato._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, metadato).pipe(
        map ((resp: any) => {
          return resp.metadato;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, metadato).pipe(
        map((resp: any) => {
          return resp.metadato;
        }));
    }
  }

}