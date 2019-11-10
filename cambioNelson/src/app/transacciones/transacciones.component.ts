import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';
import {URL } from '../config/config';


@Component({
  selector: 'app-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.css']
})
export class TransaccionesComponent implements OnInit {
  private items;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getTransacciones();
  }

  async getTransacciones() {
    //let endpoint = 'https://api.karenstoletniy1996.now.sh/api/userTransaction/' + localStorage.email
    let endpoint = URL.API_URL+'/api/userTransaction/' + localStorage.email
    let result = await this.service.getResourceAsync(endpoint, undefined);
    for (let item of result) {
      let offer = await this.getOfferInfo(item.offerID);
      if (offer != null) {
        item.badge = offer.badge;
        item.quantity = offer.quantity;
      }
    }
    this.items = result
  }

  async getOfferInfo(offerid) {
    //let endpoint = "https://api.karenstoletniy1996.now.sh/api/offer/" + offerid;
    let endpoint = URL.API_URL+"/api/offer/" + offerid;
    let result = await this.service.getResourceAsync(endpoint, undefined);
    return result;
  }

  async qualify(index) {
    //let score = JSON.parse('{"lscore": 3 }');
    let score1 = <HTMLSelectElement>document.getElementsByClassName("score-selector")[index];
    let score = score1.value;
    let body = JSON.parse('{"lscore": "' + score + '" }');
    let userOf = this.items[index].userOf;
    //let endpoint = "https://api.karenstoletniy1996.now.sh/api/user/" + userOf;
    let endpoint = URL.API_URL+"/api/user/" + userOf;
    console.log("Se le envía la calificación " + score + " al usuario " + userOf);

    let agregarScore = await this.service.putResourceAsync(endpoint, {lscore: score}, undefined);
  }


}
