import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { DarwinCore } from '../../models/darwin-core.model';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { throwError } from 'rxjs';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class DarwinCoreService {

  filesToUpload = [];
  darwinCore: DarwinCore;
  
  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService,
    public _subirArchivoService: SubirArchivoService
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

    return this.http.delete(url).pipe(
      map((resp: any) => {
        return resp.usuario;
      },
      catchError(err => {
        Swal.fire('Error al borrar registro', err.error.errors.message, 'error');
        return throwError(err);
      })));
  }


  buscarRegistro(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/darwinCores/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.darwinCores)
    );
  }


  guardarRegistro(darwinCore: DarwinCore) {
    let url = URL_SERVICIOS + '/darwinCore';

    if(darwinCore._id) {
      // Actualizar
      url += '/' + darwinCore._id + '?token=' + this._usuarioService.token;

      return this.http.put(url, darwinCore).pipe(
        map((resp: any) => {
          return resp.darwinCore;
        },
        catchError(err => {
          Swal.fire('Error al actualizar registro', err.error.errors.message, 'error');
          return throwError(err);
        })));
    } else {
      // Crear
      url += '?token=' + this._usuarioService.token;

      return this.http.post(url, darwinCore).pipe(
        map((resp: any) => {
          return resp.darwinCore;
        },
        catchError(err => {
          Swal.fire('Error al crear registro', err.error.errors.message, 'error');
          return throwError(err);
        })));
    }
  }


  importar(file: File) {
    let url = URL_SERVICIOS + '/darwinCore/importar?token=' + this._usuarioService.token;

    let formData: FormData = new FormData();
    formData.append('file', file, file.name);
    
    return this.http.post(url, formData);
  }


  exportar(tipo: string, formato: string) {
    let url = URL_SERVICIOS + '/darwinCore/exportar/' + tipo + '/' + formato + '?token=' + this._usuarioService.token;

    return this.http.get(url);
  }


  generarCSV() {
    let url = URL_SERVICIOS + '/darwinCore/exportar/csv';

    return this.http.get(url);
  }


  exportarRDF() {
    let url = URL_SERVICIOS + '/darwinCore/exportar/rdf';

    return this.http.get(url);
  }


  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'darwinCores', id)
      .then((resp: any) => {
        this.darwinCore.img = resp.darwinCore.img;
      })
      .catch(resp => {});
  }


  obtenerDepartamentos() {
    let url = "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=departamento&$group=departamento&$order=departamento"
    return this.http.get(url);
  }


  obtenerMunicipios(departamento: string) {
    let url = "https://www.datos.gov.co/resource/xdk5-pm3f.json?$select=municipio&$where=departamento=%27" + departamento + "%27&$order=municipio";
    return this.http.get(url);
  }
  
}