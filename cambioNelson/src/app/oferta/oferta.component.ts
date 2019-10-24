import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';

@Component({
  selector: 'app-oferta',
  templateUrl: './oferta.component.html',
  styleUrls: ['./oferta.component.css']
})
export class OfertaComponent implements OnInit {
  private publicacion;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    //this.publicacion = this.service.getLastPublicacion();
    this.publicacion = JSON.parse(window.localStorage.getItem("publicacion"));
    console.log(this.publicacion);
  }

}