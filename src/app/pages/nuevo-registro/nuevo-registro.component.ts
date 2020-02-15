import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-registro',
  templateUrl: './nuevo-registro.component.html',
  styles: []
})
export class NuevoRegistroComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  guardarNuevoRegistro() {
    Swal.fire('Guardado exitosamente', '', 'success')
  }

}
