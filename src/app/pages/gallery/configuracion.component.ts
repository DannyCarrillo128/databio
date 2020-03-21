import { Component, OnInit } from '@angular/core';
import { MetadatoService } from '../../services/service.index';
import { Metadato } from '../../models/metadato.model';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

declare function init_switchery();

@Component({
  selector: 'app-configuracion',
  templateUrl: './configuracion.component.html',
  styles: []
})
export class ConfiguracionComponent implements OnInit {

  metadatos: Metadato[] = [];
  desde: number = 0;

  constructor(
    public _metadatoService: MetadatoService,
    private location: Location
  ) { }

  ngOnInit() {
    init_switchery();
    this.cargarRegistros();
  }


  cargarRegistros() {
    this._metadatoService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.metadatos = resp.metadatos;
      });
  }


  actualizarMetadato(metadato: Metadato) {
    this._metadatoService.guardarRegistro(metadato)
      .subscribe(resp => Swal.fire('Metadato actualizado', '', 'success'));
  }


  borrarMetadato(metadato: Metadato) {
    Swal.fire({
      title: '¿Estas seguro?',
      text: 'Estas a punto de borrar a ' + metadato.nombre,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#398bf7',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Borrar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.value) {
        this._metadatoService.eliminarRegistro(metadato._id)
          .subscribe(resp => this.cargarRegistros());
      }
    });
  }


  cambiarVisibilidad(metadato: Metadato, valor) {
    metadato.visible = valor.target.checked;
  }


  goBack() {
    this.location.back();
  }

}