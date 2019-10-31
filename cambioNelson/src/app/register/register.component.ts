import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../controller/service.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: FormGroup;
  userExsist: boolean = false;  

  constructor(private service: ServiceService, private router: Router) { }

  ngOnInit() {
    this.user = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      phone: new FormControl('', [])
    });
  }
 

  async submitRegistre(form){
    try {
      
      let response = await this.service.postResource('http://localhost:3000/api/user', form.value)
      if(response.status == 200){
        let data = await response.json()
        console.log(data)
        window.localStorage.setItem("name", data.dataUser.name);
        window.localStorage.setItem("email", data.dataUser.email);
        window.localStorage.setItem("ACCESS_TOKEN", data.dataUser.accessToken);
        window.localStorage.setItem("EXPIRES", data.dataUser.expiresIn);
        this.service.show();
        this.router.navigate(["/publicaciones"]);
      }else if(response.status == 409){
        this.userExsist = true;
      }

    } catch (error) {
      console.log(error);
      
    }
    
    
  }




}
