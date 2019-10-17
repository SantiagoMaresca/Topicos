import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../controller/service.service';

@Component({
  selector: 'app-publicaciones',
  templateUrl: './publicaciones.component.html',
  styleUrls: ['./publicaciones.component.css']
})
export class PublicacionesComponent implements OnInit {
  private items;
  constructor(private service: ServiceService) { }

  ngOnInit() {
    this.getPublicaciones();
  }
  async getPublicaciones() {
    let result = await this.service.getResourceAsync('http://localhost:3000/api/publication', undefined);
    console.log(result);
    this.items = result

  }
}
