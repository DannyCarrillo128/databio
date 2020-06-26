import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DarwinCoreService, MetadatoService, FotografiaService } from '../../services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import { Metadato } from '../../models/metadato.model';
import { Fotografia } from '../../models/fotografia.model';

declare function init_plugins();

@Component({
  selector: 'app-photostream',
  templateUrl: './photostream.component.html',
  styles: [`
  .header {
    padding: 10px 16px;
    background: #242a33;
    color: #f1f1f1;
    display: inline-block;
  }`]
})
export class PhotostreamComponent implements OnInit {

  registro: DarwinCore = new DarwinCore();
  metadatos: Metadato[] = [];

  fotografia: Fotografia = new Fotografia();

  anio: number = new Date().getFullYear();

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _metadatoService: MetadatoService,
    public _fotografiaService: FotografiaService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarRegistro(id);
    });
  }

  ngOnInit() {
    init_plugins();
    this.cargarMetadatos();
  }


  cargarRegistro(id: string) {
    this._darwinCoreService.obtenerRegistro(id)
      .subscribe(darwinCore => {
        this.registro = darwinCore;
        if (darwinCore.fotografia) {
          return this.cargarFotografia(darwinCore.fotografia);
        } else {
          return this.fotografia = new Fotografia('', '', '', '', '', '', []);
        }
      });
  }


  cargarMetadatos() {
    this._metadatoService.cargarRegistros()
      .subscribe((resp: any) => this.metadatos = resp.metadatos);
  }


  cargarFotografia(id: string) {
    this._fotografiaService.obtenerRegistro(id)
      .subscribe(fotografia => this.fotografia = fotografia);
  }


  obtenerAnterior(id: string) {
    this._darwinCoreService.obtenerAnterior(id)
      .subscribe(darwinCore => this.router.navigate(['/photostream', darwinCore._id]));
  }


  obtenerSiguiente(id: string) {
    this._darwinCoreService.obtenerSiguiente(id)
      .subscribe(darwinCore => this.router.navigate(['/photostream', darwinCore._id]));
  }

}