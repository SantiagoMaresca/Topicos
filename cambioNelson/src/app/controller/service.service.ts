import { Injectable } from '@angular/core';


@Injectable()

export class ServiceService {
  private lastPublicacion;

  visible: boolean = true;

  constructor() { }

  //Para los metodos get
  //endpoint es toda la url completa
  //Si tiene parametros lo mismo, el parametro va en la url al igual que postman
  async getResourceAsync(endpoint, token) {
    var json;
    let resource = await fetch(endpoint, {
      method: "GET"
    })
      .then(res => {
        console.log(res.status);
        return res.json()
      })
    return resource;
  }

  //Para los metodos delete
  deleteResource(endpoint) {
    let resource = fetch(endpoint, {
      method: "DELETE",
    }).then(res => console.log(res.status));
  }

  //Para los metodos POST
  postResourceAsync(endpoint, json) {
    return fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json),
    });
  }

  //Para los metodos POST (USAR ESTE)
  async postResource(endpoint, json) {
    console.log(json)
    let resource = await this.postResourceAsync(endpoint, json)
      .then(res => {
        console.log(res.status);
        return res
      })
    return resource;
  }

  async putResourceAsync(endpoint, json, token) {
    return fetch(endpoint, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(json)
    })
  }

  getLastPublicacion() {
    return this.lastPublicacion;
  }
  setLastPublicacion(publicacion) {
    this.lastPublicacion = publicacion;
  }

  hide() { this.visible = false; }

  show() { this.visible = true; }
}
