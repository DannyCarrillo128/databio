import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { DarwinCore } from '../../models/darwin-core.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DarwinCoreService {

  darwinCore: DarwinCore;

  constructor(
    public http: HttpClient,
    public _subirArchivoService: SubirArchivoService,
    public _usuarioService: UsuarioService
  ) { }


  cargarRegistros(desde: number = 0) {
    let url = URL_SERVICIOS + '/darwinCore?desde=' + desde;

    return this.http.get(url);
  }


  obtenerRegistro(id: string) {
    let url = URL_SERVICIOS + '/darwinCore/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.darwinCore)
    );
  }


  obtenerAnterior(id: string) {
    let url = URL_SERVICIOS + '/darwinCore/anterior/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.darwinCore)
    );
  }


  obtenerSiguiente(id: string) {
    let url = URL_SERVICIOS + '/darwinCore/siguiente/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.darwinCore)
    );
  }


  eliminarRegistro(id: string) {
    let url = URL_SERVICIOS + '/darwinCore/' + id + '?token=' + this._usuarioService.token;

    return this.http.delete(url);
  }


  buscarRegistro(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/darwinCores/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.darwinCores)
    );
  }


  actualizarRegistro(darwinCore: DarwinCore) {
    let url = URL_SERVICIOS + '/darwinCore/' + darwinCore._id + '?token=' + this._usuarioService.token;

    return this.http.put(url, darwinCore).pipe(
      map((resp: any) => resp.darwinCore)
    );
  }


  guardarRegistro(darwinCore: DarwinCore) {
    let url = URL_SERVICIOS + '/darwinCore';

    if(darwinCore._id) {
      // Actualizar
      url += '/' + darwinCore._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, darwinCore).pipe(
        map((resp: any) => {
          Swal.fire('Registro Actualizado', '', 'success');
          return resp.darwinCore;
        }));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, darwinCore).pipe(
        map((resp: any) => {
          Swal.fire('Registro creado', '', 'success');
          return resp.darwinCore;
        }));
    }
  }


  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'darwinCores', id)
      .then((resp: any) => {
        this.darwinCore.associatedMedia = resp.darwinCore.associatedMedia;
      })
      .catch(resp => {});
  }
  
}