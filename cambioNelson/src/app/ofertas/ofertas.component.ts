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
  displayedColumnsSubTable: string[] = ['quantity', 'badge', 'date','save','accept'];
  displayedColumns: string[] = ['quantity', 'badge', 'place'];
  dataSource;
  expandedElement: any | null;

  //La idea es tener aca las cotizaciones
  cotizaciones = 30;
  // let publicaciones = await this.service.getResourceAsync(`http://localhost:3000/api/publicationUser/${window.localStorage.getItem("email")}`, undefined);

constructor(private service: ServiceService, private ofertasService: OfertasService) { }
  ngOnInit() {

    // this.getOfertas();
    // this.getPublications();
    this.loadData();
  }

  async loadData() {

    
    let result = await this.service.getResourceAsync(`https://cotizaciones-brou.herokuapp.com/api/currency/latest`, undefined)
    .then(res => {
      console.log(res);

      // Cargar cotizaciones
      // this.cotizaciones = res['rates'];
      
      this.getPublications();
    })
  }


  


  private getPublications(){
    this.ofertasService.getPublicacionByEmail(window.localStorage.getItem("email")).pipe(first(), mergeMap(
      (publications) => {
        return forkJoin(
          publications.map(publication=> {
            return this.ofertasService.getOfertas(publication._id).pipe(first(),map((ofertaResult) => {
              const ofertas = [];
              ofertaResult.map(ofert => {
                // if (this.cotizaciones[publication['badge']]['sell'] !== ()) {
                //   console.log("llego")
                //   brouRate = this.cotizaciones[publication['badge']]['sell']
                //   ofertas.push({...ofert, ahorro: ofert['quantity'] -(publication.quantity * brouRate)});
                // } else {
                //   console.log("llego2")
                //   ofertas.push({...ofert, ahorro: -1000000000});
                // }

                ofertas.push({...ofert, ahorro: ofert['quantity'] -(publication.quantity * this.cotizaciones)});
                
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

  async getOfertas() {
/*
    let publicaciones = await this.service.getResourceAsync(`http://localhost:3000/api/publicationUser/${window.localStorage.getItem("email")}`, undefined);
    // Foreach publication get offers
    console.log(publicaciones);
  
    const publicacionIdArray = [];
    for (let publicacion in publicaciones) {
      publicacionIdArray.push(publicaciones[oferta].publication);
    }
    console.log(publicacionIdArray)
    const uniqueSet = new Set(publicacionIdArray)
    const uniqueArray= [];
    uniqueSet.forEach(element => {
      uniqueArray.push(element);
    });
    console.log(uniqueArray)
    const publicacionesById = []
    uniqueArray.forEach(element => {
      let result2 = this.getPublicaciones(element);
      publicacionesById.push(result2);
      console.log("publicaciones:")
      console.log(result2)
    })
*/
  }

  async getPublicaciones(idPublicacion: String) {
    let publicacionURL = URL.API_URL+'/api/publication/' + idPublicacion
    let publicaciones = await this.service.getResourceAsync(publicacionURL, undefined);
    return publicaciones
  }

  public onClickOferta(oferta:any)
  {
    console.log(oferta);
    this.finalizarPublicacion(oferta.publication);
    alert("La oferta fue aceptada con éxito! Le llegara un email con más información.");
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