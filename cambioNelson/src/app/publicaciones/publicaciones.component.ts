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
  puntajes = [];
  constructor(private service: ServiceService, private router: Router) { }

  async ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
      await this.getPublicaciones();

  }

  search='';
  myControl = new FormControl();
  
  async getPublicaciones() {
    let result = await this.service.getResourceAsync(URL.API_URL+'/api/publication', undefined);
    let email = window.localStorage.email
    let final = result.filter(word => word.user != email);
    for(let key in final){
      var puntaje = await this.setPuntaje(final[key].user);
      this.puntajes.push(puntaje);
    }
    this.items = final;
  }
  
  sendToOffer(index) {
    console.log(index);
    window.localStorage.setItem("publicacion", JSON.stringify(index));
  }

  async setPuntaje(item){
    let userURL = URL.API_URL+'/api/user/' + item;
    let userData = await this.service.getResourceAsync(userURL, undefined);

    if(userData != null && userData.lscore.length> 0){
      const reducer = (accumulator, currentValue) => accumulator + currentValue;
      var total = (userData.lscore.reduce(reducer))/userData.lscore.length;
      return total;
    }else{
      return 0;
    }
  }




}
