import { Component, OnInit } from '@angular/core';
import { DarwinCoreService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';

declare function init_modals();

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  mapa: string;

  constructor(
    public _darwinCoreService: DarwinCoreService
  ) { }

  ngOnInit() {
    init_modals();
    this.cargarRegistros();
  }


  cargarRegistros() {
    this._darwinCoreService.cargarRegistros(this.desde)
    .subscribe((resp: any) => {
      this.totalRegistros = resp.total;
      this.registros = resp.darwinCores;
    });
  }


  googleMap(latitud: string, longitud: string) {
    let url = "https://maps.google.com/maps?q=";
    
    console.log(encodeURI(latitud) + " " + encodeURI(longitud));
  }

}