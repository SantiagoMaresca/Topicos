import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {

    this.AltaPublicacionForm= this.formBuilder.group({
    

    });
  }
  PublicarSubmit() {
    alert(' Nueva publicacion');
  }
  divisas: Divisa[] = [
    {value: 'pesouru-0', viewValue: 'Peso Uruguayo'},
    {value: 'dolar-1', viewValue: 'Dolar'},
    {value: 'arg-2', viewValue: 'Peso Argentino'}
  ];
}
