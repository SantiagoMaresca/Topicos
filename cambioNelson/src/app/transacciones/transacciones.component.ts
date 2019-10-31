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
    console.log(result);
    this.items = result
  }

}
