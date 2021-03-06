import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublicacionesComponent } from './publicaciones/publicaciones.component';
import { AltaPublicacionComponent } from './alta-publicacion/alta-publicacion.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertaComponent } from './oferta/oferta.component';
import { TransaccionesComponent } from './transacciones/transacciones.component';
import { RegisterComponent } from "./register/register.component" ;
import { LoginComponent } from "./login/login/login.component" ;

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'crearpublicacion', component: AltaPublicacionComponent },
  { path: 'publicacion', component: PublicacionComponent },
  { path: 'publicaciones', component: PublicacionesComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'ofertas', component: OfertasComponent },
  { path: 'transacciones', component: TransaccionesComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'login', component: LoginComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
