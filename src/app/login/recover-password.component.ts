import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, MailerService } from '../services/service.index';
import * as CryptoJS from 'crypto-js';
import Swal from 'sweetalert2';

declare function init_plugins();

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./login.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _mailerService: MailerService
  ) { }

  ngOnInit() {
    init_plugins();
  }

  recuperar(forma: NgForm) {
    if(forma.invalid) {
      return;
    }

    this._usuarioService.recuperarPassword({ email: forma.value.email })
      .subscribe(
        res => {
          this._mailerService.enviarPassword({ nombre: res.usuario, email: forma.value.email, password: CryptoJS.AES.decrypt(res.password.trim(), "oW8gfd42rr4a6H").toString(CryptoJS.enc.Utf8) })
            .subscribe(() => {
              Swal.fire('Revisa tu email', 'Se te ha enviado una contraseña provisional.', 'success');
              this.router.navigate(['/login']);
            });
        },
        err => {
          Swal.fire('Lo sentimos', err.error.errors.message, 'error');
        }
      );
  }

}