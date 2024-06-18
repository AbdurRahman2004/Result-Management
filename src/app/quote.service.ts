// quote.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class QuoteService {
  private apiUrl = 'https://api.quotable.io/random'; // Example API

  constructor(private http: HttpClient) {}

  getQuote(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }
}
