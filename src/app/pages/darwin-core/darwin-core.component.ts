import { Component, OnInit } from '@angular/core';
import { DarwinCoreService } from 'src/app/services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import Swal from 'sweetalert2';
import { URL_SERVICIOS } from '../../config/config';


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



constructor(
    public _darwinCoreService: DarwinCoreService
  ) { }

ngOnInit() {
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
    if(this.file != "" && this.file != null && this.file != undefined) {
      let formData = new FormData();
      this._darwinCoreService.uploadFile(this.file).subscribe((res)=> {
        console.log('response received is ', res);
      });
    } else {
      console.log("No a seleccionado un archivo");
    }
    
    }

}
