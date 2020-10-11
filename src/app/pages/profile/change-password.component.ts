import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styles: []
})
export class ChangePasswordComponent implements OnInit {

  usuario: Usuario;

  forma: FormGroup;
  passwordRegex = /(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/

  constructor(
    public _usuarioService: UsuarioService,
    public location: Location
  ) {
    this.usuario = this._usuarioService.usuario;
  }

  ngOnInit() {
    this.forma = new FormGroup({
      password: new FormControl(null, Validators.required),
      newPassword: new FormControl(null, [Validators.required, Validators.pattern(this.passwordRegex)]),
      confirmPassword: new FormControl(null, Validators.required)
    }, { validators: [this.sonDistintas('password', 'newPassword'), this.sonIguales('newPassword', 'confirmPassword'), this.esValida('newPassword')] });
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


  sonDistintas(campo1: string, campo2: string) {

    return (group: FormGroup) => {
      let pass1 = group.controls[campo1].value;
      let pass2 = group.controls[campo2].value;

      if(pass1 !== pass2) {
        return null;
      }
      
      return {
        sonDistintas: true
      };
    };
  }


  actualizarPassword() {
    if(this.forma.invalid) {
      return;
    }

    this._usuarioService.actualizarPassword(this.usuario, { password: this.forma.value.password, newPassword: this.forma.value.newPassword })
      .subscribe((resp: any) => {
        Swal.fire('Contraseña actualizada', '', 'success');
      },
      err => {
        Swal.fire('Lo sentimos', err.error.errors.message, 'error');
      });
  }


  goBack() {
    this.location.back();
  }

}