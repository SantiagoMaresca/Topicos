import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {URL } from '../config/config';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) {}

  getPublicacionByEmail(email: string): Observable<any> {
    return this.http.get<any>(URL.API_URL+`/api/publicationUser/${email}`);
  }

  getOfertas(id: string): Observable<any> {
    return this.http.get<any>(URL.API_URL+`/api/offer/publication/${id}`);
  }

  
}
