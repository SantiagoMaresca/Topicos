import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PublicacionModel } from '../models/publicacion.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  API_KEY ='YOUR_API_KEY';
  constructor(private httpClient : HttpClient) { }
}


public createCustomer(customer: Customer){}

public updateCustomer(customer: Customer){}

public deleteCustomer(id: number){}

public getCustomerById(id: number){}

public getCustomers(url?: string){}