import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styles: []
})
export class DashboardComponent implements OnInit {

  pieChartResults = [
    {
      name: 'Piper',
      value: 114
    },
    {
      name: 'Nectandra',
      value: 75
    },
    {
      name: 'Guatteria',
      value: 64
    },
    {
      name: 'Ocotea',
      value: 50
    },
    {
      name: 'Peperomia',
      value: 49
    },
    {
      name: 'Zanthoxylum',
      value: 38
    }
  ];

  constructor() { }

  ngOnInit() {
  }

}