import { Component, OnInit } from '@angular/core';
import { ServiceService } from "../controller/service.service";
import { Router } from "@angular/router";
import { OfertasService } from '../controller/ofertas/ofertas.service';
import { first, mergeMap, map } from 'rxjs/operators';
import { forkJoin } from 'rxjs';
import { trigger, state, transition, style, animate } from '@angular/animations';


const ELEMENT_DATA: any[] = [
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5},
  {oferta: 1, ahorro: 5, usuario: "pepito", calificacion: 5}
];


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
  valorDolar: number = 30;
//   columnDefs = [
//     {headerName: 'Oferta', field: 'oferta_divisa'},
//     {headerName: 'Usuario', field: 'usuario_ofertante'},
//     {headerName: 'Calificacion', field: 'calificacion_usuario'},
//     {headerName: 'Ahorro', field: 'dinero_ahorrado'}
// ];

// rowData = [
//     {oferta_divisa: '100', usuario_ofertante: 'Carlos Rodriguez', calificacion_usuario: 5, dinero_ahorrado: 3},
//     {oferta_divisa: '105', usuario_ofertante: 'Casipeta', calificacion_usuario: 1, dinero_ahorrado: 5},
//     {oferta_divisa: '104', usuario_ofertante: 'Fran', calificacion_usuario: 4, dinero_ahorrado: 5},
//     {oferta_divisa: '120', usuario_ofertante: 'Beloso', calificacion_usuario: 1, dinero_ahorrado: 5},
//     {oferta_divisa: '102', usuario_ofertante: 'Mares', calificacion_usuario: 4, dinero_ahorrado: 5},
//     {oferta_divisa: '115', usuario_ofertante: 'Karen', calificacion_usuario: 1, dinero_ahorrado: 10}
// ];

//   constructor(private router: Router) { }

constructor(private service: ServiceService, private ofertasService: OfertasService) { }
  ngOnInit() {

    // this.getOfertas();
    this.getPublications();
  }

  private getPublications(){
    this.ofertasService.getPublicacionByEmail(window.localStorage.getItem("email")).pipe(first(), mergeMap(
      (publications) => {
        return forkJoin(
          publications.map(publication=> {
            return this.ofertasService.getOfertas(publication._id).pipe(first(),map((ofertaResult) => {
              const ofertas = [];
              ofertaResult.map(ofert => {
                ofertas.push({...ofert, ahorro: (publication.quantity * this.valorDolar)});
              });
              return {...publication, ofertas: ofertas} ;
            }
            ));
          })
        )
      }
    )).subscribe(
      (resultado) => {
        this.dataSource = resultado.filter(x => x['ofertas'].length > 0);
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
    let publicacionURL = 'http://localhost:3000/api/publication/' + idPublicacion
    let publicaciones = await this.service.getResourceAsync(publicacionURL, undefined);
    return publicaciones
  }

  public onClickOferta(oferta:any){
    console.log(oferta);
  }
}
