import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DarwinCoreService, UsuarioService, FotografiaService, ComentarioService, MetadatoService } from '../../services/service.index';
import { Router, ActivatedRoute } from '@angular/router';
import { DarwinCore } from '../../models/darwin-core.model';
import { Metadato } from '../../models/metadato.model';
import { Usuario } from '../../models/usuario.model';
import { Fotografia } from '../../models/fotografia.model';
import { Comentario } from '../../models/comentario.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-photostream',
  templateUrl: './photostream.component.html',
  styles: []
})
export class PhotostreamComponent implements OnInit {

  registro: DarwinCore = new DarwinCore();
  metadatos: Metadato[] = [];
  usuario: Usuario;

  fotografia: Fotografia = new Fotografia();
  comentario: Comentario = new Comentario();
  totalComentarios: number = 0;

  defaultValue: string = '';
  editar: boolean = false;

  constructor(
    public _darwinCoreService: DarwinCoreService,
    public _usuarioService: UsuarioService,
    public _metadatoService: MetadatoService,
    public _fotografiaService: FotografiaService,
    public _comentarioService: ComentarioService,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    activatedRoute.params.subscribe(params => {
      let id = params['id'];
      this.cargarRegistro(id);
    });
  }
  
  ngOnInit() {
    this.usuario = this._usuarioService.usuario;
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
      .subscribe(darwinCore => this.router.navigate(['/photostream2', darwinCore._id]));
  }


  obtenerSiguiente(id: string) {
    this._darwinCoreService.obtenerSiguiente(id)
      .subscribe(darwinCore => this.router.navigate(['/photostream2', darwinCore._id]));
  }


  actualizarRegistro(darwinCore: DarwinCore) {
    this._darwinCoreService.guardarRegistro(darwinCore)
      .subscribe(darwinCore => this.registro = darwinCore);
  }


  actualizarFotografia(fotografia: Fotografia) {
    this._fotografiaService.guardarRegistro(fotografia)
      .subscribe(fotografia => {
        this.fotografia = fotografia;
        this.registro.fotografia = fotografia;
        this.actualizarRegistro(this.registro);
      });
  }


  comentar(f: NgForm) {
    let fecha: Date = new Date();

    this.comentario.texto = f.value.texto;
    this.comentario.autor = this.usuario;
    this.comentario.fecha = fecha.toLocaleDateString('es', { year: "numeric", month:"short", day:"numeric" }) + "";

    this.defaultValue = "";

    this._comentarioService.guardarRegistro(this.comentario)
      .subscribe(comentario => {
        this.fotografia.comentarios.unshift(comentario);
        this.actualizarFotografia(this.fotografia)
      });
  }


  editarComentario() {
    this.editar = true;
  }


  calificarComentario(event, comentario: Comentario) {
    comentario.puntuacion = event;
    this._comentarioService.guardarRegistro(comentario)
      .subscribe();
  }


  guardarCambios(event, comentario: Comentario) {
    if (event.key === "Enter") {
      comentario.texto = event.target.value;

      this._comentarioService.guardarRegistro(comentario)
        .subscribe(resp => this.editar = false);
    }

    if (event.key === "Escape") {
      this.editar = false;
    }
  }


  eliminarComentario(id: string) {
    this._comentarioService.eliminarRegistro(id)
      .subscribe();
  }


  removerComentario(id: string) {
    Swal.fire({
      title: 'Eliminar',
      text: "¿Seguro que quieres eliminar este comentario?",
      type: 'warning',
      animation: false,
      showCancelButton: true,
      confirmButtonColor: '#398bf7',
      cancelButtonColor: '#ef5350',
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.value) {
        this._fotografiaService.eliminarComentario(this.fotografia, id)
          .subscribe(fotografia => {
            this.fotografia = fotografia;
            this.eliminarComentario(id);
          });
      }
    });
  }
  
}