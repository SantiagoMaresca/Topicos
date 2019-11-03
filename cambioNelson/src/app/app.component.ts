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
    if(!window.localStorage.ACCESS_TOKEN){
      this.service.hide();
    }else{
      this.service.show()
    }
  }
  

  constructor(private router: Router, private service: ServiceService){}

  title = 'cambioNelson';

  logOut(){
    window.localStorage.clear();
    this.service.hide()
    this.router.navigate(["login"])
    
  }
}
