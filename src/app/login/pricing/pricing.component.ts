import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styles: [`
    .header {
      padding: 10px 16px;
      background: #242a33;
      color: #f1f1f1;
      display: inline-block;
    }`]
})
export class PricingComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}