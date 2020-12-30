import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {torreModel} from 'src/app/models/torre.model';

@Injectable({
  providedIn: 'root'
})
export class AuthtorreService {

  private url:string = "https://localhost:44316";

  constructor(private http: HttpClient) { }

  insertarTorre(torre: torreModel) {
    const authData = {
      codigo: torre.codigo,
      nombre: torre.nombre,
      cantidad_apto: torre.cantidad_apto
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });

    return this.http.post(`${this.url}/Torre/InsertarTorre`, authData, { headers });
  }

  actualizarTorre(torre: torreModel, codigo:number) {
    const authData = {
      nombre: torre.nombre,
      cantidad_apto: torre.cantidad_apto
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });

    return this.http.post(`${this.url}/Torre/ActualizarTorre?codigo=${codigo}`, authData, { headers });
  }

  validarCodigo(codigo: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Torre/BuscarTorre?codigo=${codigo}`, { headers });
  }

  validarID(id: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Torre/BuscarIDTorre?idtorre=${id}`, { headers });
  }

  eliminarTorre(id:number){
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.delete(`${this.url}/Torre/EliminarTorre?id=${id}`, { headers });
  }
  
  listarTorres() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Torre/ListarTorres`, { headers });
  }
}