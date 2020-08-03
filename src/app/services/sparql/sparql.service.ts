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
    let url = "http://dbpedia.org/sparql/?default-graph-uri=http%3A%2F%2Fdbpedia.org&query=" + query + '&format=application%2Fsparql-results%2Bjson';
    
    return this.http.get(url);
  }

}