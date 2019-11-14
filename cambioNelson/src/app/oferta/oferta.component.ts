import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";
import {URL } from '../config/config';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})

export class OfertaComponent implements OnInit {
  private publicacion;
  private email;
  ofertaForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private service: ServiceService,
    private router: Router) { }



  ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
    this.publicacion = JSON.parse(window.localStorage.getItem("publicacion"));
    this.email = window.localStorage.email;
    this.setExchange();
    this.ofertaForm = this.formBuilder.group({
      user: new FormControl(this.email, [Validators.required]),
      badge: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])

    });
    //this.publicacion = this.service.getLastPublicacion();


  }
  async sendOffer(frmPub) {
    let data = '{"quantity":' + frmPub.value["quantity"] + ',"badge":"' + frmPub.value["badge"] + '","user":"' + this.email + '","publication":"' + this.publicacion['_id'] + '"}';
    let offer: OfferJSON = JSON.parse(data);
    let result = await this.service.postResource(URL.API_URL+'/api/offer', offer);
    console.log(result);
    if(result.status == 200){
      alert("Oferta enviada con éxito! Aguarda a que el dueño de la publicación acepte!");
      let message = 
        {
          asunto : "Cambio Nelson: Nueva oferta a su publicación: Vendo "+ this.publicacion.quantity+this.publicacion.badge,
          "to" : this.publicacion.user,
          "mensaje" : window.localStorage.name +" te ha ofertado a la publicación con el ID: "+this.publicacion._id
      }
      await this.service.postResource(URL.API_URL+'/api/sendEmail', message);
      this.router.navigate(["/publicaciones"]);
    }

  }

  obtenerPuntaje(element){
    
  }
  setExchange(){
    let divisa = this.publicacion.badge;
    if(divisa == 'UYU'){
      this.divisas = [
        { value: 'USD', viewValue: 'Dolar' },
        { value: 'ARS', viewValue: 'Peso Argentino' },
        { value: 'BRL', viewValue: 'Real Brasilero' },
        { value: 'EUR', viewValue: 'Euro' }
      ]
    }else{
      this.divisas = [
        { value: 'UYU', viewValue: 'Peso Uruguayo' }]
    }

  }
  divisas;

}

interface OfferJSON {
  date: Date;
  quantity: number;
  badge: string;
  user: string;
  publication: string;
}


