import { Component, OnInit } from '@angular/core';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Router } from "@angular/router";



@Component({
  selector: 'app-publicacion',
  templateUrl: './publicacion.component.html',
  styleUrls: ['./publicacion.component.css']
})
export class PublicacionComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    if(!window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["login"])
    }
  }

}
