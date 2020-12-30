import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

import {apartamentoModel} from 'src/app/models/apartamento.model';

@Injectable({
  providedIn: 'root'
})
export class AuthapartamentoService {

  private url:string = "https://localhost:44316";

  constructor(private http: HttpClient) { }

  insertarApartamento(apartamento: apartamentoModel, codigoTorre:number) {
    const authData = {
      codigo: apartamento.codigo,
      numero_apto: apartamento.numero_apto,
      piso: apartamento.piso,
      cant_habitaciones: apartamento.cant_habitaciones,
      precio_venta: apartamento.precio_venta,
      precio_alquiler: apartamento.precio_alquiler,
      codigoTorre: apartamento.codigoTorre
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });

    return this.http.post(`${this.url}/Apartamento/InsertarApartamento?codigoTorre=${codigoTorre}`, 
    authData, { headers });
  }

  actualizarApartamento(apartamento: apartamentoModel, codigoTorre:number, codigoApartamento:string) {
    const authData = {
      numero_apto: apartamento.numero_apto,
      piso: apartamento.piso,
      cant_habitaciones: apartamento.cant_habitaciones,
      precio_venta: apartamento.precio_venta,
      precio_alquiler: apartamento.precio_alquiler,
      codigoTorre: apartamento.codigoTorre
    };

    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });

    return this.http.post(`${this.url}/Apartamento/ActualizarApartamento?codigoTorre=${codigoTorre}
    &codigoApartamento=${codigoApartamento}`, 
    authData, { headers });
  }

  validarCodigoApartamento(codigo: string) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Apartamento/BuscarApartamento?codigo=${codigo}`, { headers });
  }

  validarID(id: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Apartamento/BuscarIDApartamento?idapartamento=${id}`, { headers });
  }

  eliminarApartamento(id: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.delete(`${this.url}/Apartamento/EliminarApartamento?id=${id}`, { headers });
  }

  validarNumeroApartamento(numero:number, codigo: number) {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Apartamento/BuscarNumeroApto?numero=${numero}&codigo=${codigo}`, 
    { headers });
  }

  listarApartamentos() {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "https://localhost:44316",
      "Access-Control-Allow-Credentials": "true",
    });
    return this.http.get(`${this.url}/Apartamento/ListarApartamentos`, { headers });
  }
}
