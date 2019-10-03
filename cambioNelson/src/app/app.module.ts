import { BrowserModule } from '@angular/platform-browser';
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MaterialModule } from './materialcomponents';
import {ReactiveFormsModule} from '@angular/forms';
import { MatIconModule, MatInputModule, MatButtonModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { LoginModel } from './models/login.model';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  schemas:[ CUSTOM_ELEMENTS_SCHEMA ],

  bootstrap: [AppComponent]
})
export class AppModule { }
