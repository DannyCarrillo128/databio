import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SparqlService {

  sparqlData = null;

  constructor(
    public http: HttpClient
  ) { }
  

  query(query: string) {
    let url = "http://localhost:3030/Databio/query?query=" + query;
    
    return this.http.get(url);
  }

}