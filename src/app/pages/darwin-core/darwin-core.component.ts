import { Component, OnInit } from '@angular/core';
import { DarwinCoreService, UsuarioService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import { Router } from '@angular/router';
import { ModalMenuService } from '../../components/modal-menu/modal-menu.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-darwin-core',
  templateUrl: './darwin-core.component.html',
  styles: []
})
export class DarwinCoreComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _modalMenuService: ModalMenuService,
    public router: Router
  ) { }

  ngOnInit() {
    this.cargarRegistros();
    this._modalMenuService.notificacion
      .subscribe(resp => this.cargarRegistros());
  }


  onRightClick(info) {
    this._modalMenuService.mostrarModal(info);
    /* const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary',
        cancelButton: 'btn btn-secondary'
      }
    });
    
    swalWithBootstrapButtons.fire({
      title: info.catalogNumber,
      type: 'info',
      showCloseButton: true,
      showCancelButton: true,
      confirmButtonText: 'Editar',
      cancelButtonText: 'Nuevo'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/darwinCore', info._id]);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.router.navigate(['/darwinCore', 'nuevo']);
      }
    }); */

    return false;
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
      this.totalRegistros = resp.total;
      this.registros = resp.darwinCores;
    });
  }


  buscarRegistro(termino: string) {
    if(termino.length <= 0) {
      this.cargarRegistros();
      return;
    }

    this._darwinCoreService.buscarRegistro(termino)
      .subscribe(registros => this.registros = registros);
  }


  eliminarRegistro(registro: DarwinCore) {
    this._darwinCoreService.eliminarRegistro(registro._id)
          .subscribe(borrado => this.cargarRegistros());
  }

}