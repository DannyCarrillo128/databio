import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/service.index';
import { Event } from '../../models/event.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styles: []
})
export class EventComponent implements OnInit {

  registros: Event[] = [];
  desde: number = 0;
  totalRegistros: number = 0;

  constructor(
    public _eventService: EventService
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
    this._eventService.cargarRegistros(this.desde)
      .subscribe((resp: any) => {
        this.totalRegistros = resp.total;
        this.registros = resp.events;
      });
  }

}