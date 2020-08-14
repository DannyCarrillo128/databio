import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

const URL_ENDPOINT = environment.URL_ENDPOINT;

@Injectable({
  providedIn: 'root'
})
export class SparqlService {

  constructor(
    public http: HttpClient,
    public router: Router
  ) { }
  

  query(query: string) {
    let url = URL_ENDPOINT + "/query?query=" + query;

    window.open(url, '_blank');
    //return this.http.get(url);
  }

}