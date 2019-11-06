import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../controller/service.service';
import { Router } from "@angular/router";
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material/icon';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: FormGroup;
  userExsist: boolean = false;  

  constructor(private service: ServiceService, private router: Router, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) { 
    iconRegistry.addSvgIcon(
      'phone',
      sanitizer.bypassSecurityTrustResourceUrl('assets/phone-24px.svg'));
    iconRegistry.addSvgIcon(
        'key',
        sanitizer.bypassSecurityTrustResourceUrl('assets/vpn_key-24px (1).svg'));
     iconRegistry.addSvgIcon(
          'email',
          sanitizer.bypassSecurityTrustResourceUrl('assets/mail_outline-24px.svg'));
    iconRegistry.addSvgIcon(
            'name',
            sanitizer.bypassSecurityTrustResourceUrl('assets/account_circle-24px.svg'));
  }

  ngOnInit() {
    if(window.localStorage.ACCESS_TOKEN){
      this.router.navigate(["publicaciones"])
    }
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
