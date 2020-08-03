import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-recover-password',
  templateUrl: './recover-password.component.html',
  styleUrls: ['./login.component.css']
})
export class RecoverPasswordComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}