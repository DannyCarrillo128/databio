import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pie-grid-chart',
  templateUrl: './pie-grid-chart.component.html',
  styles: []
})
export class PieGridChartComponent implements OnInit {

  single = [
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

  colorScheme = {
    domain: ['#5AA454', '#E44D25', '#CFC0BB', '#7aa3e5', '#a8385d', '#aae3f5']
  };

  constructor() { }

  ngOnInit() {
  }

}
