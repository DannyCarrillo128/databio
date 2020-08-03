import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class MailerService {

  constructor(
    public http: HttpClient
  ) { }


  enviarSolicitud(body) {
    let url = URL_SERVICIOS + '/enviar/solicitud';

    return this.http.post(url, body);
  }


  enviarConfirmacion(body) {
    let url = URL_SERVICIOS + '/enviar/confirmacion';

    return this.http.post(url, body);
  }

}