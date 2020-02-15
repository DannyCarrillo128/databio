import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any = [
    {
      titulo: 'Administrador',
      icono: 'mdi mdi-account-settings-variant',
      submenu: [
        { titulo: 'Usuarios', url: '/usuarios' },
        { titulo: 'Darwin Core', url: '/darwinCore' },
        { titulo: 'Galería', url: '/gallery2' }
      ]
    }
  ];

  constructor() { }
}