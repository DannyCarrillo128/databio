import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DarwinCoreService } from 'src/app/services/service.index';
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

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];

      if(id !== 'nuevo') {
        this.cargarRegistro(id);
      }
    });
  }

  ngOnInit() {
  }


  cargarRegistro(id: string) {
    this._darwinCoreService.obtenerRegistro(id)
      .subscribe(darwinCore => this.registro = darwinCore);
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
    console.log(f.value);
    console.log(this.imagenSubir);

    if(f.invalid) {
      return;
    }

    this._darwinCoreService.guardarRegistro(this.registro)
      .subscribe(registro => {
        this.registro._id = registro._id;
        this._darwinCoreService.cambiarImagen(this.imagenSubir, this.registro._id);
        this.router.navigate(['/darwinCore', registro._id]);
      });
  }

}