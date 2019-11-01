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
    let result = await this.service.getResourceAsync('http://localhost:3000/api/transaction', undefined);
    for (let item of result) {
      let offer = await this.getOfferInfo(item.offerID);
      item.badge = offer.badge;
      item.quantity = offer.quantity;
    }
    this.items = result
  }

  async getOfferInfo(offerid) {
    let endpoint = "http://localhost:3000/api/offer/" + offerid;
    let result = await this.service.getResourceAsync(endpoint, undefined);
    return result;
  }

  async qualify(index) {
    let score = { "lscore": 3 };
    let endpoint = "http://localhost:3000/api/user/:" + this.items[index].userOf;
    console.log(endpoint);
    let agregarScore = await this.service.putResourceAsync(endpoint, score, undefined);

    //this.service.setLastPublicacion(this.items[index]);
    //window.localStorage.setItem("publicacion", JSON.stringify(this.items[index]));
  }
}
