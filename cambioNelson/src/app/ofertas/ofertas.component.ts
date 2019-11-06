import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-ofertas',
  templateUrl: './ofertas.component.html',
  styleUrls: ['./ofertas.component.css']
})
export class OfertasComponent implements OnInit {

  columnDefs = [
    {headerName: 'Oferta', field: 'oferta_divisa'},
    {headerName: 'Usuario', field: 'usuario_ofertante'},
    {headerName: 'Calificacion', field: 'calificacion_usuario'},
    {headerName: 'Ahorro', field: 'dinero_ahorrado'}
];

rowData = [
    {oferta_divisa: '100', usuario_ofertante: 'Carlos Rodriguez', calificacion_usuario: 5, dinero_ahorrado: 3},
    {oferta_divisa: '105', usuario_ofertante: 'Casipeta', calificacion_usuario: 1, dinero_ahorrado: 5},
    {oferta_divisa: '104', usuario_ofertante: 'Fran', calificacion_usuario: 4, dinero_ahorrado: 5},
    {oferta_divisa: '120', usuario_ofertante: 'Beloso', calificacion_usuario: 1, dinero_ahorrado: 5},
    {oferta_divisa: '102', usuario_ofertante: 'Mares', calificacion_usuario: 4, dinero_ahorrado: 5},
    {oferta_divisa: '115', usuario_ofertante: 'Karen', calificacion_usuario: 1, dinero_ahorrado: 10}
];

  constructor(private router: Router) { }

  ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
  }

}
