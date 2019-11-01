import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../controller/service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: FormGroup;
  incorrectCredentials: boolean = false;

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }

  async login(frmLogin){
    try {
      debugger;
      let response = await this.service.postResource('http://localhost:3000/api/login', frmLogin.value)
      if(response.status == 200){
        let data = await response.json()
        window.localStorage.setItem("name", data.dataUser.name);
        window.localStorage.setItem("email", data.dataUser.email);
        window.localStorage.setItem("ACCESS_TOKEN", data.dataUser.accessToken);
        window.localStorage.setItem("EXPIRES", data.dataUser.expiresIn);
        this.service.show();
        this.router.navigate(["/publicaciones"]);
      }else{
        this.incorrectCredentials = true
      }
    } catch (error) {
      console.log(error);
      
    }

  }

}