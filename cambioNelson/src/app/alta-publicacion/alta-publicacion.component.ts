import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../controller/service.service";
import { Router } from "@angular/router";
import {URL } from '../config/config';

export interface Divisa {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-alta-publicacion',
  templateUrl: './alta-publicacion.component.html',
  styleUrls: ['./alta-publicacion.component.css']
})
export class AltaPublicacionComponent implements OnInit {

  AltaPublicacionForm: FormGroup;
  hide = true;
  email;

  constructor(private formBuilder: FormBuilder, private service: ServiceService, private router: Router) { }

  ngOnInit() {

    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"]);
    }else{
      this.email = window.localStorage.email
      this.AltaPublicacionForm = this.formBuilder.group({
        user: new FormControl(this.email, [Validators.required]),
        place: new FormControl('', [Validators.required]),
        badge: new FormControl('', [Validators.required]),
        quantity: new FormControl('', [Validators.required]
      )
  
      });
    }


  }
  async PublicarSubmit(frmPub) {
    console.log(frmPub.value)
    var response = await this.service.postResource(URL.API_URL+'/api/publication', frmPub.value);
  // var response = await this.service.postResource('http://localhost:3000/api/publication', frmPub.value)
    if(response.status ==200){
      alert("Publicacion ingresada con exito!")
      this.router.navigate(["/publicaciones"])
    }else{
      console.log(response);
    }


  }

  setExchange(divisa){
    if(divisa == 'UYU'){
      this.divisas2 = [
        { value: 'USD', viewValue: 'Dolar' },
        { value: 'ARS', viewValue: 'Peso Argentino' },
        { value: 'BRL', viewValue: 'Real Brasilero' },
        { value: 'EUR', viewValue: 'Euro' }
      ]
    }else{
      this.divisas2 = [
        { value: 'UYU', viewValue: 'Peso Uruguayo' }]
    }

  }
  divisas: Divisa[] = [
    { value: 'UYU', viewValue: 'Peso Uruguayo' },
    { value: 'USD', viewValue: 'Dolar' },
    { value: 'ARS', viewValue: 'Peso Argentino' },
    { value: 'BRL', viewValue: 'Real Brasilero' },
    { value: 'EUR', viewValue: 'Euro' }
  ];

  divisas2: Divisa[] = [
  ];
}
