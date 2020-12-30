import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Router } from "@angular/router";
import {AuthtorreService} from 'src/app/services/torre-services/authtorre.service';
import Swal from 'sweetalert2';

import {torreModel} from 'src/app/models/torre.model';

@Component({
  selector: 'app-insertar-torres',
  templateUrl: './insertar-torres.component.html'
})
export class InsertarTorresComponent implements OnInit {
  torre: torreModel;
  constructor(private authtorre: AuthtorreService, private router: Router) { }

  ngOnInit(): void {
    this.torre = new torreModel(); 
  }

  validar(){
    this.authtorre.validarCodigo(this.torre.codigo).subscribe(
      (resp_validar:torreModel) => {
        if(resp_validar != null){
        resp_validar = this.torre;
        console.log("resp_validar= " + resp_validar);
        }else{
          console.log("respuesta es null");
          return null;
        }
      },
      (err) => {
        console.log(err.error.error.message + " Error de compilacion");
      }
    );
    console.log("respuesta= " + this.torre.codigo);
    return this.torre;
  }

  onSubmit(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.authtorre.validarCodigo(this.torre.codigo).subscribe(
      (resp) => {
        if(resp == null){
          this.authtorre.insertarTorre(this.torre).subscribe(
            (respu) => {
              if (respu = false) {
                Swal.fire("verificar datos", "", "warning");
              } else {
                Swal.fire("Torre registrada con exito", "", "success");
                this.router.navigateByUrl("/listadotorres");
              }
            },
            (err) => {
              console.log(err.error.error.message + " Error de compilacion");
              Swal.fire("Error", "", "warning");
            }
          );
        }else{
          Swal.fire("Codigo ya existe", "", "warning");
        }
      },
      (err) => {
        console.log(err.error.error.message + " Error de compilacion");
        Swal.fire("Error", "", "warning");
      }
    );
  }
}

/*
    if(this.validar() == null){
      this.authtorre.insertarTorre(this.torre).subscribe(
        (respu) => {
          if (respu = false) {
            Swal.fire("verificar datos", "", "warning");
          } else {
            console.log(respu);
            Swal.fire("Torre registrada con exito", "", "success");
            this.router.navigateByUrl("/listadotorres");
          }
        },
        (err) => {
          console.log(err.error.error.message + " Error de compilacion");
          Swal.fire("Error", "", "warning");
        }
      );
    }else{
      Swal.fire("Codigo ya existe", "", "warning");
    }
*/
