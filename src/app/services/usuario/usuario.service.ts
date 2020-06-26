import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';
import { MailerService } from '../mailer/mailer.service';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any[] = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService,
    public _mailerService: MailerService
    ) {
    this.cargarStorage();
  }


  estaLogueado() {
    return (this.token.length > 5) ? true: false;
  }


  renovarToken() {
    let url = URL_SERVICIOS + '/login/renovarToken?token=' + this.token;

    return this.http.get(url).pipe(
      map((resp: any) => {
        this.token = resp.token;
        localStorage.setItem('token', this.token);
        return true;
      },
      catchError(err => {
        this.router.navigate(['/login']);
        return throwError(err);
      })));
  }


  cargarStorage() {
    if(localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.menu = JSON.parse(localStorage.getItem('menu'));
    } else {
      this.token = '';
      this.usuario = null;
      this.menu = [];
    }
  }


  guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    localStorage.setItem('menu', JSON.stringify(menu));

    this.usuario = usuario;
    this.token = token;
    this.menu = menu;
  }


  logout() {
    this.usuario = null;
    this.token = '';
    this.menu = [];

    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    localStorage.removeItem('menu');

    this.router.navigate(['/login']);
  }


  login(usuario: Usuario, recuerdame: boolean = false) {
    if(recuerdame) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }

    let url = URL_SERVICIOS + '/login';

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
        return true;
      },
      catchError(err => {
        return throwError(err);
      })));
  }


  loginGoogle(token: string, admins: any) {
    let url = URL_SERVICIOS + '/login/google';
    
    return this.http.post(url, { token }).pipe(
      map((resp: any) => {
        if (resp.usuario.estado === 'Verificado') {
          this.guardarStorage(resp.id, resp.token, resp.usuario, resp.menu);
          window.location.href = '#/dashboard';
        } else {
          Swal.mixin({
            confirmButtonText: 'Siguiente',
            showCancelButton: true,
            cancelButtonColor: '#ef5350',
            cancelButtonText: 'Cancelar',
            animation: false,
            allowOutsideClick: false,
            /* Cambiar el href */
            footer: '<strong><a target="_blank" href="/#/termsAndConditions"> Términos y Condiciones</a></strong>',
            progressSteps: ['1', '2', '3']
          }).queue([
            {
              title: 'Contacto',
              input: 'number',
              inputPlaceholder: 'Teléfono',
              inputValidator: (value) => {
                if(!value) {
                  return 'Completa este campo'
                }
              }
            },
            {
              title: 'Personal',
              html: '<select id="input1" class="swal2-input"><option selected disabled value="">Interés</option><option value="Amateur">Amateur</option><option value="Académico">Académico</option><option value="Científico">Científico</option></select>' + 
                    '<input id="input2" class="swal2-input" placeholder="Ocupación">' + 
                    '<input id="input3" class="swal2-input" placeholder="Institución">',
              preConfirm: () => {
                if(!(<HTMLInputElement>document.getElementById('input1')).value || !(<HTMLInputElement>document.getElementById('input2')).value || !(<HTMLInputElement>document.getElementById('input3')).value) {
                  Swal.showValidationMessage('Completa todos los campos');
                } else {
                  return [(<HTMLInputElement>document.getElementById('input1')).value, (<HTMLInputElement>document.getElementById('input2')).value, (<HTMLInputElement>document.getElementById('input3')).value];
                }
              }
            },
            {
              title: 'Solicitud',
              input: 'textarea',
              inputPlaceholder: 'Escribe una solicitud...',
              inputValidator: (value) => {
                if(!value) {
                  return 'Completa este campo'
                }
              }
            }
          ]).then((result) => {
            if (result.value) {
              resp.usuario.telefono = result.value[0];
              resp.usuario.interes = result.value[1][0];
              resp.usuario.ocupacion = result.value[1][1];
              resp.usuario.institucion = result.value[1][2];
              resp.usuario.solicitud = result.value[2];

              let body = {
                admins: admins,
                nombre: resp.usuario.nombre,
                email: resp.usuario.email,
                telefono: resp.usuario.telefono,
                interes: resp.usuario.interes,
                institucion: resp.usuario.institucion,
                ocupacion: resp.usuario.ocupacion,
                solicitud: resp.usuario.solicitud
              };

              this.crearUsuario(resp.usuario).subscribe();
              this._mailerService.enviarSolicitud(body)
                .subscribe(() => Swal.fire('Solicitud enviada', '', 'success'));
            }
          });
        }
      }));
  }


  crearUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + "/usuario";

    return this.http.post(url, usuario).pipe(
      map((resp: any) => {
        return resp.usuario
      },
      catchError(err => {
        Swal.fire('El email o el teléfono ya pertencen a otro usuario', err.error.errors.message, 'error');
        return throwError(err);
      })));
  }


  actualizarUsuario(usuario: Usuario) {
    let url = URL_SERVICIOS + '/usuario/' + usuario._id + '?token=' + this.token;

    return this.http.put(url, usuario).pipe(
      map((resp: any) => {
        if(usuario._id === this.usuario._id) {
          this.guardarStorage(resp.usuario._id, this.token, resp.usuario, this.menu);
        }
        return resp.usuario;
      }),
      catchError(err => {
        return throwError(err);
      }));
  }


  cambiarImagen(archivo: File, id: string) {
    this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        this.usuario.img = resp.usuario.img;
        Swal.fire('Imágen Actualizada', this.usuario.nombre, 'success');
        this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {});
  }


  cargarUsuarios(desde: number = 0) {
    let url = URL_SERVICIOS + '/usuario?desde=' + desde;

    return this.http.get(url);
  }


  obtenerUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id;

    return this.http.get(url).pipe(
      map((resp: any) => resp.usuario));
  }


  buscarUsuarios(termino: string) {
    let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;

    return this.http.get(url).pipe(
      map((resp: any) => resp.usuarios));
  }


  borrarUsuario(id: string) {
    let url = URL_SERVICIOS + '/usuario/' + id + '?token=' + this.token;

    return this.http.delete(url).pipe(
      map((resp: any) => resp.usuario));
  }

}