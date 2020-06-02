import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService, MailerService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: string;
  recuerdame: boolean = false;
  auth2: any;

  admins: string[] = [];

  constructor(
    public router: Router,
    public _usuarioService: UsuarioService,
    public _mailerService: MailerService
    ) { }


  ngOnInit() {
    init_plugins();
    this.googleInit();
    this.obtenerAdmins();

    this.email = localStorage.getItem('email') || '';
    if(this.email.length > 1) {
      this.recuerdame = true;
    }
  }


  obtenerAdmins() {
    this._usuarioService.buscarUsuarios('ADMIN_ROLE')
      .subscribe(resp => {
        resp.forEach(admin => {
          this.admins.push(admin.email);
        });
      });
  }


  googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '99813985473-qhmd03s5gsjc7tustgu2lmujungk98j4.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnGoogle'));
    });
  }


  attachSignin(element) {
    this.auth2.attachClickHandler(element, {}, (googleUser) => {
      let token = googleUser.getAuthResponse().id_token;

      this._usuarioService.loginGoogle(token, this.admins)
        .subscribe();
    });
  }


  ingresar(forma: NgForm) {
    if(forma.invalid) {
      return;
    }

    let usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario, forma.value.recuerdame)
      .subscribe(resp => this.router.navigate(['/dashboard']));
  }

}