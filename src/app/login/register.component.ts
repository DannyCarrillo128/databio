import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsuarioService, MailerService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare function init_plugins();
declare function init_wizard();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

  admins: string[] = [];

  constructor(
    public _usuarioService: UsuarioService,
    public _mailerService: MailerService,
    public router: Router
  ) { }

  ngOnInit() {
    init_plugins();
    init_wizard();
    this.obtenerAdmins();
    this.forma = new FormGroup({
      nombre: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      telefono: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
      password2: new FormControl(null, Validators.required),
      interes: new FormControl("Interés", Validators.required),
      ocupacion: new FormControl(null, Validators.required),
      institucion: new FormControl(null, Validators.required),
      solicitud: new FormControl(null, Validators.required),
      condiciones: new FormControl(false)
    }, { validators: [this.sonIguales('password', 'password2'), this.esValida('password')] });
  }


  esValida(campo1: string) {
    
    return (group: FormGroup) => {
      let pass = group.controls[campo1].value;

      if (this.passwordRegex.exec(pass)) {
        return null;
      }

      return {
        esValida: true
      };
    };
  }


  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 === pass2) {
        return null;
      }
      
      return {
        sonIguales: true
      };
    };
  }


  obtenerAdmins() {
    this._usuarioService.buscarUsuarios('ADMIN_ROLE')
      .subscribe(resp => {
        resp.forEach(admin => {
          this.admins.push(admin.email);
        });
      });
  }
  

  registrarUsuario() {
    console.log(this.forma);
    if(this.forma.invalid) {
      return;
    }

    if(!this.forma.value.condiciones) {
      Swal.fire('Importante', 'Debe aceptar los términos y condiciones', 'warning')
      return;
    }

    let usuario = new Usuario(
      this.forma.value.nombre,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.telefono,
      this.forma.value.interes,
      this.forma.value.ocupacion,
      this.forma.value.institucion,
      this.forma.value.solicitud
    );

    let body = {
      admins: this.admins,
      nombre: this.forma.value.nombre,
      email: this.forma.value.email,
      telefono: this.forma.value.telefono,
      interes: this.forma.value.interes,
      institucion: this.forma.value.institucion,
      ocupacion: this.forma.value.ocupacion,
      solicitud: this.forma.value.solicitud
    }

    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => {
        this._mailerService.enviarSolicitud(body).subscribe();
        this.router.navigate(['/login']);
      });
  }

}