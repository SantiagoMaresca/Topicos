import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

//EJEMPLO: importar el modulo
import { AppComponent } from './app.component';


const routes: Routes = [
  //EJEMPLO: ponerle una path
  { path: 'registre', component: AppComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
