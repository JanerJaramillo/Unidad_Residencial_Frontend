import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import {ListadoTorresComponent} from './pages/torre/listado-torres/listado-torres.component';
import {InsertarTorresComponent} from './pages/torre/insertar-torres/insertar-torres.component';
import { ActualizarTorresComponent } from './pages/torre/actualizar-torres/actualizar-torres.component';
import { InsertarApartamentosComponent } from './pages/apartamento/insertar-apartamentos/insertar-apartamentos.component';
import { ListadoApartamentosComponent } from './pages/apartamento/listado-apartamentos/listado-apartamentos.component';
import {ActualizarApartamentosComponent} from './pages/apartamento/actualizar-apartamentos/actualizar-apartamentos.component';



const routes: Routes = [
  {path: 'home' , component: HomeComponent },
  {path: 'listadotorres' , component: ListadoTorresComponent},
  {path: 'insertartorres' , component: InsertarTorresComponent},
  {path: 'actualizartorres/:idtorre', component: ActualizarTorresComponent},
  {path: 'insertarapartamentos', component:InsertarApartamentosComponent},
  {path: 'listadoapartamentos', component: ListadoApartamentosComponent},
  {path: 'actualizarapartamentos/:idapartamento', component: ActualizarApartamentosComponent},
  {path: '**', redirectTo: 'home' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
