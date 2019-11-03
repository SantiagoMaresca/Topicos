import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';
import {Router  } from "@angular/router";

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  private items;
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
    this.getPublicaciones();
  }
  async getPublicaciones() {
    let result = await this.service.getResourceAsync('http://localhost:3000/api/publication', undefined);
    console.log(result);
    this.items = result
  }

  sendToOffer(index) {
    console.log(this.items[index]);
    //this.service.setLastPublicacion(this.items[index]);
    window.localStorage.setItem("publicacion", JSON.stringify(this.items[index]));
  }
}
