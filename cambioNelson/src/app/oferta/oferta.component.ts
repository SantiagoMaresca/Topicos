import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})

export class OfertaComponent implements OnInit {
  private publicacion;
  constructor(private service: ServiceService) { }



  ngOnInit() {
    //this.publicacion = this.service.getLastPublicacion();
    this.publicacion = JSON.parse(window.localStorage.getItem("publicacion"));
    console.log(this.publicacion);
  }
  sendOffer(index) {
    let data = '{"date":"' + new Date().toLocaleString() + '","quantity":1231231,"badge":"USD","user":"user1@mail.com","publication":"' + this.publicacion['_id'] + '"}';
    let offer: OfferJSON = JSON.parse(data);
    let result = this.service.postResource('http://localhost:3000/api/offer', offer);
  }

}

interface OfferJSON {
  date: Date;
  quantity: number;
  badge: string;
  user: string;
  publication: string;
}
