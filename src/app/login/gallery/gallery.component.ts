import { Component, OnInit } from '@angular/core';
import { DarwinCoreService } from '../../services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';

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
      display: inline-block;
    }`]
})
export class GalleryComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  paginas: number[];
  primeraVez: boolean = true;

  ocultar: boolean = false;

  anio: number = new Date().getFullYear();

  constructor(
    public _darwinCoreService: DarwinCoreService
  ) { }

  ngOnInit() {
    init_plugins();
    init_modals();
    this.cargarRegistros();
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
        this.ocultar = true;
      });
  }


  cancelarBusqueda(input) {
    this.ocultar = false;
    input.value = '';
    this.cargarRegistros();
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