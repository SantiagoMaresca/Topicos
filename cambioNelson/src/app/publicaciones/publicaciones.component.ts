import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';
import {Router  } from "@angular/router";
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {URL } from '../config/config';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css'],

})
export class PublicacionesComponent implements OnInit {

  private items = [];
  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
      this.getPublicaciones();
  }

  search='';
  myControl = new FormControl();
  
  async getPublicaciones() {
    let result = await this.service.getResourceAsync(URL.API_URL+'/api/publication', undefined);
    let email = window.localStorage.email
    this.items = result.filter(word => word.user != email);
  }
  
  sendToOffer(index) {
    console.log(index);
    window.localStorage.setItem("publicacion", JSON.stringify(index));
  }

  async setPuntaje(item){
   /* let userURL = URL.API_URL+'/api/user/' + item.user;
    let userData = await this.service.getResourceAsync(userURL, undefined);

    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    var total = (userData.lscore.reduce(reducer))/userData.lscore.length;
    return total;*/
  }




}
