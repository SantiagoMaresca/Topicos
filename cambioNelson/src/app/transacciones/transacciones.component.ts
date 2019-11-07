import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';


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
    //let endpoint = 'http://localhost:3000/api/userTransaction/'+localStorage.email
    //let result = await this.service.getResourceAsync(endpoint, undefined);
    let result = await this.service.getResourceAsync('https://api.karenstoletniy1996.now.sh/api/transaction', undefined);
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
    let endpoint = "http://localhost:3000/api/offer/" + offerid;
    let result = await this.service.getResourceAsync(endpoint, undefined);
    return result;
  }

  async qualify(index) {
    //let score = JSON.parse('{"lscore": 3 }');
    let score1 = <HTMLSelectElement>document.getElementsByClassName("score-selector")[index];
    let score = score1.value;
    let body = JSON.parse('{"lscore": "' + score + '" }');
    let userOf = this.items[index].userOf;
    let endpoint = "http://localhost:3000/api/user/" + userOf;
    console.log("Se le envía la calificación " + score + " al usuario " + userOf);

    let agregarScore = await this.service.putResourceAsync(endpoint, body, undefined);
  }


}
