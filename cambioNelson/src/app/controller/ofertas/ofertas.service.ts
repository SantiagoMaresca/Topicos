import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OfertasService {

  constructor(private http: HttpClient) {}

  getPublicacionByEmail(email: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/publicationUser/${email}`);
  }

  getOfertas(id: string): Observable<any> {
    return this.http.get<any>(`http://localhost:3000/api/offer/publication/${id}`);
  }

  
}
