import {FormGroup,FormBuilder,Validators, FormControl} from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../controller/service.service";

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

  constructor(private formBuilder: FormBuilder, private service: ServiceService) { }

  ngOnInit() {

    this.AltaPublicacionForm= this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      place: new FormControl('', [Validators.required]),
      badge: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])

    });
  }
  async PublicarSubmit(frmPub) {
    console.log(frmPub.value)
    await this.service.postResource('http://localhost:3000/api/publication', frmPub.value)
    alert("Publicacion ingresada con exito!")
  }
  divisas: Divisa[] = [
    {value: 'UY', viewValue: 'Peso Uruguayo'},
    {value: 'US', viewValue: 'Dolar'},
    {value: 'ARG', viewValue: 'Peso Argentino'}
  ];
}
