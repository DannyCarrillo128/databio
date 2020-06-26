import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Location } from '@angular/common';
import { DarwinCore } from 'src/app/models/darwin-core.model';
import { Fotografia } from '../../models/fotografia.model';
import { DarwinCoreService, FotografiaService } from '../../services/service.index';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-camara',
  templateUrl: './gestion-camara.component.html',
  styles: []
})
export class GestionCamaraComponent implements OnInit {

  registro: DarwinCore = new DarwinCore();

  fotografia: Fotografia = new Fotografia();

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _fotografiaService: FotografiaService,
    public activatedRoute: ActivatedRoute,
    public location: Location
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarRegistro(id);
    });
  }

  ngOnInit() {
  }


  cargarRegistro(id: string) {
    this._darwinCoreService.obtenerRegistro(id)
      .subscribe(darwinCore => {
        this.registro = darwinCore;
        if (darwinCore.fotografia) {
          return this.cargarFotografia(darwinCore.fotografia);
        }

        if (!darwinCore.fotografia) {
          return this.fotografia = new Fotografia('', '', '', '', '', '', []);
        }
      });
  }


  cargarFotografia(id: string) {
    this._fotografiaService.obtenerRegistro(id)
      .subscribe(fotografia => this.fotografia = fotografia);
  }


  actualizarRegistro(darwinCore: DarwinCore) {
    this._darwinCoreService.guardarRegistro(darwinCore)
      .subscribe(darwinCore => {
        this.registro = darwinCore;
        Swal.fire('Datos de Cámara Actualizados', '', 'success');
      });
  }


  guardarRegistro(f: NgForm) {
    this.fotografia.camara = f.value.camara;
    this.fotografia.apertura = f.value.apertura;
    this.fotografia.distanciaFocal = f.value.distanciaFocal;
    this.fotografia.tiempoDeExposicion = f.value.tiempoDeExposicion;
    this.fotografia.iso = f.value.iso;
    this.fotografia.flash = f.value.flash;

    this._fotografiaService.guardarRegistro(this.fotografia)
      .subscribe(fotografia => {
        this.registro.fotografia = fotografia;
        this.actualizarRegistro(this.registro);
      });
  }


  goBack() {
    this.location.back();
  }

}