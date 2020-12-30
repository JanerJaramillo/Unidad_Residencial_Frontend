import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthapartamentoService} from 'src/app/services/apartamento-services/authapartamento.service';
import {AuthtorreService} from 'src/app/services/torre-services/authtorre.service';
import Swal from 'sweetalert2';

import {apartamentoModel} from 'src/app/models/apartamento.model';
import {torreModel} from 'src/app/models/torre.model';

@Component({
  selector: 'app-insertar-apartamentos',
  templateUrl: './insertar-apartamentos.component.html'
})
export class InsertarApartamentosComponent implements OnInit {

  apartamento: apartamentoModel;
  torre: torreModel;

  constructor(private authapartamento: AuthapartamentoService, 
    private authtorre: AuthtorreService, private router: Router) { }

  ngOnInit(): void {
    this.apartamento = new apartamentoModel();
  }
  
  onSubmit(form: NgForm){
    if (form.invalid) {
      return;
    }
    this.authtorre.validarCodigo(this.apartamento.codigoTorre).subscribe(
      (resp_validarCodigo) =>{

        //Valida si existe la torre
        if(resp_validarCodigo != null){
          this.authapartamento.validarCodigoApartamento(this.apartamento.codigo).subscribe(
            (resp_validarCodigoApartamento) => {

              //valida que no se vaya a registrar un apartamento con un codigo ya existente
              if(resp_validarCodigoApartamento == null){
                this.authapartamento.validarNumeroApartamento(this.apartamento.numero_apto, this.apartamento.codigoTorre).subscribe(
                  (resp_validarNumeroApartamento) => {
                    
                    //valida que no se vaya a registrar un numero del apartamento ya existente en una torre
                    if(resp_validarNumeroApartamento == null){
                      this.authapartamento.insertarApartamento(this.apartamento, this.apartamento.codigoTorre).subscribe(
                        (respu) => {
                          if(respu = false){
                            Swal.fire("verificar datos", "", "warning");
                          }else{
                            Swal.fire("Apartamento registrado con exito", "", "success");
                            this.router.navigateByUrl("/listadoapartamentos");
                          }
                        },
                        (err) => {
                          console.log(err.error.error.message + " Error de compilacion");
                          Swal.fire("Error", "", "warning");
                        }
                      );
                    }else{
                      Swal.fire("numero del apartamento ya existe en este codigo de la torre", "", "warning");
                    }
                  },
                  (err) => {
                    console.log(err.error.error.message + " Error de compilacion");
                    Swal.fire("Error", "", "warning");
                  }
                );
              }else{
                Swal.fire("Codigo del apartamento ya existe", "", "warning");
              }
            },
            (err) => {
              console.log(err.error.error.message + " Error de compilacion");
              Swal.fire("Error", "", "warning");
            }
          );
        }else{
          Swal.fire("Codigo de la torre no existe", "", "warning");
        }
      },
      (err) => {
        console.log(err.error.error.message + " Error de compilacion");
        Swal.fire("Error", "", "warning");
      }
    );
  }
}
