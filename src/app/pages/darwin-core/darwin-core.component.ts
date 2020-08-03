import { Component, OnInit } from '@angular/core';
import { DarwinCoreService, UsuarioService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';
import { ModalMenuService } from '../../components/modal-menu/modal-menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-darwin-core',
  templateUrl: './darwin-core.component.html',
  styles: []
})
export class DarwinCoreComponent implements OnInit {

  usuario: Usuario;

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  paginas: number[];
  primeraVez: boolean = true;

  ocultar: boolean = false;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _usuarioService: UsuarioService,
    public _modalMenuService: ModalMenuService,
    public router: Router
  ) { }


  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
    this.cargarRegistros();
    this._modalMenuService.notificacion
      .subscribe(resp => this.cargarRegistros());
  }
  
  
  onRightClick(info) {
    if (this.usuario.role === 'ADMIN_ROLE') {
      this._modalMenuService.mostrarModal(info);
      return false;
    } else {
      return false;
    }
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
    this.cargarRegistros();
  }


  cargarRegistros() {
    this._darwinCoreService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      if (this.primeraVez) {
        this.paginas = this.paginar(Math.ceil(resp.total / 50), 1);
        this.primeraVez = false;
      }
      this.totalRegistros = resp.total;
      this.registros = resp.darwinCores;
    });
  }


  buscarRegistro(termino: string) {
    if(termino === '') {
      this.cargarRegistros();
      return;
    }

    this._darwinCoreService.buscarRegistro(termino)
      .subscribe(registros => {
        this.registros = registros;
        this.totalRegistros = registros.length;
        this.ocultar = true;
      });
  }


  cancelarBusqueda(input) {
    this.ocultar = false;
    input.value = '';
    this.cargarRegistros();
  }


  importar() {
    Swal.fire({
      title: 'Cargar archivo .csv',
      input: 'file',
      showCancelButton: true,
      confirmButtonColor: '#398bf7',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Importar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this.upload(result.value);
      }
    });
  }

  
  verDetalle(info) {
    this.router.navigate(['/detalle', info._id]);
  }


  upload(file: any) {
    if (file !== "" && file !== null && file !== undefined) {
      this._darwinCoreService.uploadFile(file)
        .subscribe(res => {
          console.log('response received is ', res);
        });
    } else {
      console.log("No ha seleccionado un archivo");
    }
  }


  eliminarRegistro(registro: DarwinCore) {
    this._darwinCoreService.eliminarRegistro(registro._id)
          .subscribe(borrado => this.cargarRegistros());
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
    this.cargarRegistros();
  }

}