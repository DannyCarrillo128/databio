import { Component, OnInit } from '@angular/core';
import { DarwinCoreService } from '../services/service.index';
import { DarwinCore } from '../models/darwin-core.model';

declare function init_plugins();
declare function init_modals();

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: [`
    .header {
      padding: 10px 16px;
      background: #242a33;
      color: #f1f1f1;
      z-index: 10;
    }

    .sticky {
      position: fixed;
      top: 0;
      width: 100%;
    }`]
})
export class GalleryComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  anio: number = new Date().getFullYear();

  constructor(
    public _darwinCoreService: DarwinCoreService
  ) { }

  ngOnInit() {
    init_plugins();
    init_modals();
    this.cargarRegistro();
  }


  cargarRegistro() {
    this._darwinCoreService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.darwinCores;
      });
  }

}