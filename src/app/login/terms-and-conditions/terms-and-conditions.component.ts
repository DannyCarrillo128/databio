import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styles: [`
    .header {
      padding: 10px 16px;
      background: #242a33;
      color: #f1f1f1;
      display: inline-block;
    }
    ul {
      padding:0;
      margin:0
    }
    li {
      list-style:none
    }
    a:focus,a:hover {
     text-decoration:none;
     -webkit-transition:.3s ease;
     -o-transition:.3s ease;
     transition:.3s ease
    }
    a:focus {
     outline:0
    }
    img {
     max-width:100%
    }
    p {
     font-size:16px;
     line-height:30px;
     color: black;
     font-weight:300
    }
    a {
     color:#5867dd
    }
    .no-padding {
     padding:0!important
    }
    .go_top {
     line-height:40px;
     cursor:pointer;
     width:40px;
     background:#5867dd;
     color:#fff;
     position:fixed;
     -webkit-box-shadow:0 4px 4px rgba(0,0,0,.1);
     box-shadow:0 4px 4px rgba(0,0,0,.1);
     -webkit-border-radius:50%;
     border-radius:50%;
     right:-webkit-calc((100% - 1140px)/ 2);
     right:calc((100% - 1140px)/ 2);
     z-index:111;
     bottom:80px;
     text-align:center
    }
    .go_top span {
     display:inline-block
    }
    .footer-big {
     padding:105px 0 65px 0
    }
    .footer-big .footer-widget {
     margin-bottom:40px
    }
    .footer--light {
     background:#e7e8ed
    }
    .footer-big .footer-menu ul li a,.footer-big p,.footer-big ul li {
     color:#898b96
    }
    .footer-menu {
     padding-left:48px
    }
    .footer-menu ul li a {
     font-size:15px;
     line-height:32px;
     -webkit-transition:.3s;
     -o-transition:.3s;
     transition:.3s
    }
    .footer-menu ul li a:hover {
     color:#5867dd
    }
    .footer-menu--1 {
     width:100%
    }
    .footer-widget-title {
     line-height:42px;
     margin-bottom:10px;
     font-size:18px
    }
    `]
})
export class TermsAndConditionsComponent implements OnInit {

  anio: number = new Date().getFullYear();

  constructor() { }

  ngOnInit() {
    init_plugins();
  }

}