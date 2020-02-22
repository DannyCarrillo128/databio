import { Component, OnInit } from '@angular/core';
import { ModalMenuService } from './modal-menu.service';
import { DarwinCoreService } from '../../services/service.index';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DarwinCore } from '../../models/darwin-core.model';

@Component({
  selector: 'app-modal-menu',
  templateUrl: './modal-menu.component.html',
  styles: []
})
export class ModalMenuComponent implements OnInit {

  constructor(
    public _modalMenuService: ModalMenuService,
    public _darwinCoreService: DarwinCoreService,
    public router: Router
  ) { }

  ngOnInit() {
  }


  cerrarModal() {
    this._modalMenuService.ocultarModal();
  }


  recargar() {
    this.router.navigateByUrl('/refresh', { skipLocationChange: true })
      .then(() => { this.router.navigate(['/darwinCore']); });
  }


  editarRegistro(id: string) {
    this._modalMenuService.ocultarModal();
    this.router.navigate(['/darwinCore', id]);
  }


  eliminarRegistro(registro: DarwinCore) {
    this._modalMenuService.ocultarModal();
    Swal.fire({
      title: '¿Eliminar este registro?',
      text: this._modalMenuService.titulo,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#398bf7',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._darwinCoreService.eliminarRegistro(registro._id)
          .subscribe(resp => {
            Swal.fire('Eliminado', this._modalMenuService.titulo, 'success');
            this.recargar();
          });
      }
    });
  }


  nuevoRegistro() {
    this._modalMenuService.ocultarModal();
    this.router.navigate(['/darwinCore', 'nuevo']);
  }

}