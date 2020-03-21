import { Injectable, EventEmitter } from '@angular/core';
import { DarwinCore } from 'src/app/models/darwin-core.model';

@Injectable({
  providedIn: 'root'
})
export class ModalMenuService {

  public oculto: string = 'oculto';
  public notificacion = new EventEmitter<any>();
  public titulo: string = '';
  public registro: DarwinCore;

  constructor() { }


  ocultarModal() {
    this.oculto = 'oculto';
  }


  mostrarModal(registro: DarwinCore) {
    this.oculto = '';
    this.registro = registro;
    this.titulo = registro.catalogNumber;
  }
}