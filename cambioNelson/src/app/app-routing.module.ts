import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublicacionComponent } from './publicacion/publicacion.component';
import { OfertasComponent } from './ofertas/ofertas.component';
import { OfertaComponent } from './oferta/oferta.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publicacion', component: PublicacionComponent },
  { path: 'oferta', component: OfertaComponent },
  { path: 'ofertas', component: OfertasComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
