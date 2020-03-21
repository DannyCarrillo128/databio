import { Component, OnInit } from '@angular/core';
import { DarwinCoreService, UsuarioService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';

import { Router } from '@angular/router';
import { ModalMenuService } from '../../components/modal-menu/modal-menu.service';

@Component({
  selector: 'app-darwin-core',
  templateUrl: './darwin-core.component.html',
  styles: []
})
export class DarwinCoreComponent implements OnInit {

  registros: DarwinCore[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  csvSubir: File;
  csvTemp: string | ArrayBuffer;


  uploadedFiles: Array < File > ;

  public file: any;
  public fileName = 'Seleccionar un archivo ...'




  paginas: number[];
  primeraVez: boolean = true;

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
      if (this.primeraVez) {
        this.paginas = this.paginar(Math.ceil(resp.total / 50), 1);
        this.primeraVez = false;
      }
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

  /* seleccionCSV(archivo: File) {
    if(!archivo) {
      this.csvSubir = null;
      return;
    }

    /* if(archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo se permiten imágenes', '', 'error');
      this.csvSubir = null;
      return;
    } */

    /* this.csvSubir = archivo;

    let reader = new FileReader();
    let urlCSVTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.csvTemp = reader.result;
  } */


  /* cambiarCSV() {
    this._darwinCoreService.cambiarCSV(this.csvSubir, this.usuario._id);
  } */
  fileChange(event) {
    console.log(event);
    if (event.srcElement.files.length > 0) {
      this.file = event.srcElement.files[0];
      this.fileName = event.srcElement.files[0].name;
    } else {
      this.file = false;
      this.fileName = 'Seleccionar un archivo...'
    }
  }

  upload() {
    if (this.file !== "" && this.file !== null && this.file !== undefined) {
      let formData = new FormData();
      this._darwinCoreService.uploadFile(this.file).subscribe((res)=> {
        console.log('response received is ', res);
      });
    } else {
      console.log("No a seleccionado un archivo");
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
