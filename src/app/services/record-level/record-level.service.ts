import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecordLevelService {

  constructor(
    public http: HttpClient
    ) { }


  cargarRegistros(desde: number = 0) {
    let url = URL_SERVICIOS + '/recordLevel?desde=' + desde;
    
    return this.http.get(url);
    /* return this.http.get(url).pipe(
      map((resp: any) => {
        this.totalRegistros = resp.total;
        return resp.recordLevels;
      })
    ); */
  }


  obtenerRegistro(id: string) {
    let url = URL_SERVICIOS + '/recordLevel/' + id;
    
    return this.http.get(url).pipe(
      map((resp: any) => resp.recordLevel)
    );
  }


  /* eliminarRegistro(id: string) {
    let url = URL_SERVICIOS + '/recordLevel/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  buscarRegistro(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/recordLevels/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.recordLevel)
    );
  }


  guardarRegistro(recordLevel: RecordLevel) {
    let url = URL_SERVICIOS + '/recordLevel';

    if(recordLevel._id) {
      // Actualizar
      url += '/' + recordLevel._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, recordLevel).pipe(
        map((resp: any) => {
          return resp.recordLevel;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, recordLevel).pipe(
        map((resp: any) => {
          return resp.recordLevel;
        }));
    }
  } */

}