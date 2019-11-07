import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {Subject} from 'rxjs';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertaComponent } from './oferta/oferta.component';
import { HomeComponent } from './home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { RouterModule} from '@angular/router';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { AgGridModule } from 'ag-grid-angular';
import { HttpClientModule } from '@angular/common/http';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ReactiveFormsModule} from '@angular/forms';
import { MatIconModule, MatInputModule, MatButtonModule, MatFormField } from '@angular/material';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { AltaPublicacionComponent } from './alta-publicacion/alta-publicacion.component';
import {PublicacionesComponent}  from './publicaciones/publicaciones.component';
import { FormsModule } from '@angular/forms';
import {ServiceService} from './controller/service.service';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { BusquedaPublicacionesComponent } from './busqueda-publicaciones/busqueda-publicaciones.component';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { FilterPipe } from './publicaciones/filter.pipe';
import { LoginComponent } from './login/login/login.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AppComponent,
    PublicacionComponent,
    OfertasComponent,
    HomeComponent,
    AltaPublicacionComponent,
    PublicacionesComponent,
    OfertasComponent,
    OfertaComponent,
    TransaccionesComponent,
    BusquedaPublicacionesComponent,
    FilterPipe,
    RegisterComponent,
    LoginComponent
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NoopAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    AgGridModule,
    MatFormFieldModule,
    MatSelectModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
  MatAutocompleteModule,
  RouterModule,
  MatTableModule
 
  ],
  providers: [ServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
