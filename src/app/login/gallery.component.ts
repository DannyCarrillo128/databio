import { Component, OnInit } from '@angular/core';

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
      z-index: 10;
    }

    .sticky {
      position: fixed;
      top: 0;
      width: 100%;
    }`]
})
export class GalleryComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
    init_modals();
  }

}