import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {

  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  paginas: number[];
  primeraVez: boolean = true;

  ocultar: boolean = false;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarUsuarios();
  }


  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if(desde >= this.totalRegistros) {
      return;
    }

    if(desde < 0) {
      return;
    }

    this.desde += valor;
    this.cargarUsuarios();
  }


  buscarUsuarios(termino: string) {
    if(termino === '') {
      this.cargarUsuarios();
      return;
    }

    this._usuarioService.buscarUsuarios(termino)
      .subscribe(usuarios => {
        this.usuarios = usuarios;
        this.totalRegistros = usuarios.length;
        this.ocultar = true;
      });
  }


  cancelarBusqueda(input) {
    this.ocultar = false;
    input.value = '';
    this.cargarUsuarios();
  }


  cargarUsuarios() {
    this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
        if (this.primeraVez) {
          this.paginas = this.paginar(Math.ceil(resp.total / 50), 1);
          this.primeraVez = false;
        }
        this.totalRegistros = resp.total;
        this.usuarios = resp.usuarios;
      });
  }


  borrarUsuario(usuario: Usuario) {
    if(usuario._id === this._usuarioService.usuario._id) {
      Swal.fire('Operación Prohibida', 'No es posible borrarse a sí mismo', 'error');
      return;
    }

    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas a punto de borrar a ' + usuario.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#398bf7',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this._usuarioService.borrarUsuario(usuario._id)
          .subscribe(borrado => this.cargarUsuarios());
      }
    });
  }


  cambiarEstado(usuario: Usuario, valor) {
    if (valor.target.checked) {
      usuario.estado = 'Verificado';
    } else {
      usuario.estado = 'Inactivo';
    }
  }


  actualizarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario(usuario)
      .subscribe(() => Swal.fire('Datos de usuario actualizados', '', 'success'));
  }


  verDetalle(usuario: Usuario) {
    this.router.navigate(['/perfiles', usuario._id]);
  }


  paginar(totalPaginas: number, paginaActual: number) {
    let inicio: number;
    let final: number;

    if (totalPaginas <= 10) {
      inicio = 1;
      final = totalPaginas;
    } else {
      if (paginaActual <= 6) {
        inicio = 1;
        final = 10;
      } else if (paginaActual + 4 >= totalPaginas) {
        inicio = totalPaginas - 9;
        final = totalPaginas;
      } else {
        inicio = paginaActual - 5;
        final = paginaActual + 4;
      }
    }

    return Array.from(Array((final + 1) - inicio).keys()).map(i => inicio + i);
  }


  cambiarPagina(paginaActual: number = 1, tamanoPagina: number) {
    this.paginas = this.paginar(Math.ceil(this.totalRegistros / 50), paginaActual)
    this.desde = tamanoPagina * (paginaActual - 1);
    this.cargarUsuarios();
  }

}