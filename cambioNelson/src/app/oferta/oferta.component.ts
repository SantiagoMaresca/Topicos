import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from "@angular/router";

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
    this.ofertaForm = this.formBuilder.group({
      user: new FormControl('', [Validators.required]),
      badge: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required])

    });
    //this.publicacion = this.service.getLastPublicacion();
    this.publicacion = JSON.parse(window.localStorage.getItem("publicacion"));
    this.email = window.localStorage.email;
    console.log(this.publicacion);
  }
  sendOffer(frmPub) {
    let data = '{"date":"' + new Date().toLocaleString() + '","quantity":' + frmPub.value["quantity"] + ',"badge":"' + frmPub.value["badge"] + '","user":"' + frmPub.value["user"] + '","publication":"' + this.publicacion['_id'] + '"}';
    let offer: OfferJSON = JSON.parse(data);
    let result = this.service.postResource('http://localhost:3000/api/offer', offer);
    this.router.navigate(["/ofertas"])
  }

}

interface OfferJSON {
  date: Date;
  quantity: number;
  badge: string;
  user: string;
  publication: string;
}
