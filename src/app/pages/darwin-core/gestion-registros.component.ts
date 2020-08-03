import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DarwinCoreService } from '../../services/service.index';
import { DarwinCore } from '../../models/darwin-core.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-registros',
  templateUrl: './gestion-registros.component.html',
  styles: []
})
export class GestionRegistrosComponent implements OnInit {
  
  registro: DarwinCore = new DarwinCore();
  imagenSubir: File;
  imagenTemp: string | ArrayBuffer;

  municipios: any[] = [];
  departamentos: any[] = [];

  aviso: string;

  DMSLatitude = /^([0-9]|[0-8][0-9]|8[0-9]|90)°([0-9]{1,2})\x27?([0-9]{1,2}(?:\.[0-9]+){0,1})?\x22([N|S])$/;
  DMSLongitude = /^([0-9]|[0-9][0-9]|1[0-7][0-9]|180)°([0-9]{1,2})\x27?([0-9]{1,2}(?:\.[0-9]+){0,1})?\x22([E|W])$/;
  DDLatitude = /^(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  DDLongitude =/^(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  latitude = /^([0-9]|[0-8][0-9]|8[0-9]|90)°([0-9]{1,2})\x27?([0-9]{1,2}(?:\.[0-9]+){0,1})?\x22([N|S])|(\+|-)?(?:90(?:(?:\.0{1,6})?)|(?:[0-9]|[1-8][0-9])(?:(?:\.[0-9]{1,6})?))$/;
  longitude = /^([0-9]|[0-9][0-9]|1[0-7][0-9]|180)°([0-9]{1,2})\x27?([0-9]{1,2}(?:\.[0-9]+){0,1})?\x22([E|W])|(\+|-)?(?:180(?:(?:\.0{1,6})?)|(?:[0-9]|[1-9][0-9]|1[0-7][0-9])(?:(?:\.[0-9]{1,6})?))$/;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id !== 'nuevo') {
        this.aviso = 'Registro Actualizado';
        this.cargarRegistro(id);
      } else {
        this.aviso = 'Registro Creado'
        this.registro = {
          language: 'es',
          institutionID : '800086201-5',
          collectionID: 'Registro Nacional de Colecciones:72',
          institutionCode: 'Instituto para la Investigación y la Preservación del Patrimonio Cultural y Natural del Valle del Cauca',
          collectionCode: 'INCIVA',
          basisOfRecord: 'Espécimen preservado',
          continent: 'SA',
          country: 'Colombia',
          geodeticDatum: 'WGS84',
          verbatimCoordinateSystem: 'grados minutos segundos'
        }
      }
    });
  }

  ngOnInit() {
    this.obtenerDepartamentos();
  }


  cargarRegistro(id: string) {
    this._darwinCoreService.obtenerRegistro(id)
      .subscribe(darwinCore => {
        this.registro = darwinCore;
        this.obtenerMunicipios(darwinCore.stateProvince);
      });
  }


  seleccionarImagen(archivo: File) {
    if(!archivo) {
      this.imagenSubir = null;
      return;
    }

    if(archivo.type.indexOf('image') < 0) {
      Swal.fire('Sólo Imágenes', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this.imagenSubir = archivo;

    let reader = new FileReader();
    let urlImagenTemp = reader.readAsDataURL(archivo);

    reader.onloadend = () => this.imagenTemp = reader.result;
  }


  guardarRegistro(f: NgForm) {
    if(f.invalid) {
      Swal.fire('Error en el formulario', '', 'error');
      return;
    }

    this._darwinCoreService.guardarRegistro(this.registro)
      .subscribe(registro => {
        this.registro._id = registro._id;
        this._darwinCoreService.cambiarImagen(this.imagenSubir, this.registro._id);
        Swal.fire(this.aviso, '', 'success');
        this.router.navigate(['/darwinCore', registro._id]);
      });
  }


  obtenerDepartamentos() {
    this._darwinCoreService.obtenerDepartamentos()
      .subscribe((resp: any) => {
        this.departamentos = resp;
      });
  }


  obtenerMunicipios(departamento: string) {
    this._darwinCoreService.obtenerMunicipios(departamento)
      .subscribe((resp: any) => {
        this.municipios = resp;
      });
  }

}