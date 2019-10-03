import {LoginModel} from '../models/login.model';
import {FormGroup,FormBuilder,Validators} from '@angular/forms';
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

  export class LoginComponent implements OnInit {
    user: LoginModel = new LoginModel();
    LoginForm: FormGroup;
    hide = true;
  
    constructor(private formBuilder: FormBuilder) { }
  
    ngOnInit() {
      this.LoginForm = this.formBuilder.group({
       
        'email': [this.user.email, [
          Validators.required,
          Validators.email
        ]],
        'password': [this.user.password, [
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(30)
        ]]
      });
    }
  
    LoginSubmit() {
      alert(this.user.email + ' ' + this.user.password);
    }
  
  }