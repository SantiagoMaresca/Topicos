import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PublicacionComponent } from './publicacion/publicacion.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'publicacion', component: PublicacionComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
