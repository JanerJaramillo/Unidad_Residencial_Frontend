import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HomeComponent } from './pages/home/home.component';
import { ListadoTorresComponent } from './pages/torre/listado-torres/listado-torres.component';
import { InsertarTorresComponent } from './pages/torre/insertar-torres/insertar-torres.component';
import { InsertarApartamentosComponent } from './pages/apartamento/insertar-apartamentos/insertar-apartamentos.component';
import { ListadoApartamentosComponent } from './pages/apartamento/listado-apartamentos/listado-apartamentos.component';
import { ActualizarTorresComponent } from './pages/torre/actualizar-torres/actualizar-torres.component';
import { ActualizarApartamentosComponent } from './pages/apartamento/actualizar-apartamentos/actualizar-apartamentos.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListadoTorresComponent,
    InsertarTorresComponent,
    ActualizarTorresComponent,
    InsertarApartamentosComponent,
    ListadoApartamentosComponent,
    ActualizarApartamentosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
