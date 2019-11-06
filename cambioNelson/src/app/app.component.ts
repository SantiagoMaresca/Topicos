import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { ServiceService } from '../app/controller/service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  ngOnInit(){
    this.service.visible;
  }
  

  constructor(private router: Router, private service: ServiceService){}

  title = 'cambioNelson';
  showToolbar = false;

  logOut(){
    window.localStorage.clear();
    this.service.hide()
    this.router.navigate(["login"])
    
  }
}
