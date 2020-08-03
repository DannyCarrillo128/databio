import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styles: [`
    .header {
      padding: 10px 16px;
      background: #242a33;
      color: #f1f1f1;
      display: inline-block;
    }`]
})
export class AboutUsComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}