import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [];

  /* menu: any = [
    {
      titulo: 'Administrador',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Darwin Core', url: '/darwinCore' },
        { titulo: 'Galería', url: '/gallery2' }
      ]
    }
  ]; */

  constructor(
    public _usuarioService: UsuarioService
  ) { }

  cargarMenu() {
    this.menu = this._usuarioService.menu;
  }

}