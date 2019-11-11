import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../controller/service.service";
import { Router } from "@angular/router";
import { OfertasService } from '../controller/ofertas.service';
import { first, mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';
import {URL } from '../config/config';



@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})

export class OfertasComponent implements OnInit {
  displayedColumnsSubTable: string[] = ['quantity', 'badge','user','date','save','accept'];
  displayedColumns: string[] = ['quantity', 'badge', 'place'];
  dataSource = [];
  expandedElement: any | null;

constructor(private service: ServiceService, private ofertasService: OfertasService) { }
  ngOnInit() {
    this.loadData();
  }

  async loadData() {
      this.getPublications();
  }

  private getPublications(){
    this.ofertasService.getPublicacionByEmail(window.localStorage.getItem("email")).pipe(first(), mergeMap(
      (publications) => {
        return forkJoin(
          
          publications.map(publication=> {
            return this.ofertasService.getOfertas(publication._id).pipe(first(),map((ofertaResult) => {
              const ofertas = [];
              ofertaResult.map(async ofert => {

                console.log("ahorrooooo")
                // obtener ahorro aqui
                let ahorro = await this.getAhorro(publication, ofert)
                ofertas.push({...ofert, ahorro: ahorro["diff"].toFixed(1)});        
              });
              return {...publication, ofertas: ofertas} ;
            }
            ));
          })
        )
      }
    )).subscribe(
      (resultado) => {
        let resultado1 = resultado.filter(x => x["isActive"]);
        console.log(resultado);
        this.dataSource = resultado1;
      },
      () => {
        // error
      }
    );
  }

  async getAhorro(publicacion: any, oferta: any) {
    let data = '{"inputCoin":"' + publicacion["badge"] + '","outputCoin":"' + oferta["badge"] + '","inputQuantity":' + publicacion["quantity"] + ',"outputQuantity":' + oferta["quantity"] +'}';
    
    let ahorroJSON: AhorroJSON = JSON.parse(data);

    let ahorroURL = URL.API_URL+'/api/brou';
    let result = await this.service.postResource(ahorroURL, ahorroJSON)
    if (result.status == 200) {
      let res = await result.json()
      return res;
    }
  }

  // async convertAhorroToJSON(response: Response) {
  //   let res = await response.json();
  //   return res
  // }

  async getPublicaciones(idPublicacion: String) {
    let publicacionURL = URL.API_URL+'/api/publication/' + idPublicacion
    let publicaciones = await this.service.getResourceAsync(publicacionURL, undefined);
    return publicaciones
  }

  async onClickOferta(oferta:any)
  {
    console.log(oferta);
    this.finalizarPublicacion(oferta.publication);
    let telefonoPub = await this.obtenerNumeroTel(window.localStorage.email);
    let telefonoOf = await this.obtenerNumeroTel(oferta.user);
    alert("La oferta fue aceptada con éxito! Le llegara un email con más información.");
    let message = 
      {
        asunto : "Cambio Nelson: Finalización de transacción",
        "to" : window.localStorage.email,
        "mensaje" : "La transacción fue éxitosa! Comunicate con el ofertante por email o via télefono: \n"+
        "Telefono: " + telefonoOf + " \nEmail: "+ oferta.user + "\n Muchas gracias por confiar en Cambio Nelson."

      }
    await this.service.postResource(URL.API_URL+'/api/sendEmail', message);
    let message2 = 
    {
      asunto : "Cambio Nelson: Finalización de transacción",
      "to" : oferta.user,
      "mensaje" : "Su oferta ha sido aceptada! Comunicate con el publicante por email o via télefono: \n"+
      "Telefono: " + telefonoPub + " Email: "+ window.localStorage.email + "\n Muchas gracias por confiar en Cambio Nelson."

    }
  await this.service.postResource(URL.API_URL+'/api/sendEmail', message2);
    location.href = "./publicaciones"
  }

  async finalizarPublicacion(publicacion: any) {
    let isAcceptedURL = URL.API_URL+'/api/publication/'+publicacion
    this.service.putResourceAsync(isAcceptedURL, undefined, undefined);
  }

  async obtenerNumeroTel(user){
    let userURL = URL.API_URL+'/api/user/' + user;
    let userData = await this.service.getResourceAsync(userURL, undefined);
    return userData.phone;
  }
}

interface TransactionJSON {
  offerID: string;
  publicationID: string;
  userOf: string;
  userPub: string;
}

interface AhorroJSON {
  inputCoin: string; 
  outputCoin: string;
  inputQuantity: number; 
  outputQuantity: number; 
}