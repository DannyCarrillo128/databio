import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const URL_SERVICIOS = environment.URL_SERVICIOS;

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor(
    public http: HttpClient
  ) { }


  enviarSolicitud(body: any) {
    let url = URL_SERVICIOS + '/enviar/solicitud';

    return this.http.post(url, body);
  }


  enviarConfirmacion(body: any) {
    let url = URL_SERVICIOS + '/enviar/confirmacion';

    return this.http.post(url, body);
  }


  enviarPassword(body: any) {
    let url = URL_SERVICIOS + '/enviar/password';

    return this.http.post(url, body);
  }

}