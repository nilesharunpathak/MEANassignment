import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
url = 'http://localhost:5000';
  constructor(private http: HttpClient) {}

  insertExchanges() {
    return this.http.get(this.url+'/insert-exchanges');
  }

  insertExchangeIcon() {
    return this.http.get(this.url+'/insert-exchange-icon');
  }

  fetchExchanges(){
    return this.http.get(this.url+'/exchange-list')
  }

  fetchExchangesIcon(){
    return this.http.get(this.url+'/exchange-icon-list')
  }
}
