import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DarwinCoreService } from '../../services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';

@Component({
  selector: 'app-detalle-registro',
  templateUrl: './detalle-registro.component.html',
  styles: []
})
export class DetalleRegistroComponent implements OnInit {

  registro: DarwinCore = new DarwinCore();
  imagenTemp: string | ArrayBuffer;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public router: Router,
    public activatedRoute: ActivatedRoute,
    private location: Location
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
      .subscribe(darwinCore => this.registro = darwinCore);
  }


  goBack() {
    this.location.back();
  }

}