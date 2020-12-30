import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {AuthapartamentoService} from 'src/app/services/apartamento-services/authapartamento.service';
import {AuthtorreService} from 'src/app/services/torre-services/authtorre.service';
import Swal from 'sweetalert2';

import {apartamentoModel} from 'src/app/models/apartamento.model';
import {torreModel} from 'src/app/models/torre.model';

@Component({
  selector: 'app-actualizar-apartamentos',
  templateUrl: './actualizar-apartamentos.component.html'
})
export class ActualizarApartamentosComponent implements OnInit {

  apartamento: apartamentoModel;
  torre: torreModel;

  constructor(private authapartamento: AuthapartamentoService, 
    private authtorre: AuthtorreService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.apartamento = new apartamentoModel();
    this.llenarDato();
  }

  llenarDato(){
    let id = this.route.snapshot.params['idapartamento'];
    if(!id) return;
    console.log(id);
    this.authapartamento.validarCodigoApartamento(id).subscribe(
      (resp:any) => {
        if(resp != null){
          console.log(resp);
          this.apartamento.codigo = resp.Codigo;
          this.apartamento.numero_apto = resp.Numero_apto;
          this.apartamento.piso = resp.Piso;
          this.apartamento.cant_habitaciones = resp.Cant_habitaciones;
          this.apartamento.precio_venta = resp.Precio_venta;
          this.apartamento.precio_alquiler = resp.Precio_alquiler;
          this.apartamento.codigoTorre = resp.CodigoTorre;
          console.log(this.apartamento);
        }else{
          console.log("No se pudo llenar los datos");
        }
      },
      (err) =>{
        console.log(err.error.error.message + " Error de compilacion");
      }
    );
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

              //valida que el codigo del apartamento existe
              if(resp_validarCodigoApartamento != null){
                this.authapartamento.actualizarApartamento(this.apartamento, this.apartamento.codigoTorre, this.apartamento.codigo).subscribe(
                  (respu) => {
                    if(respu = false){
                      Swal.fire("verificar datos", "", "warning");
                    }else{
                      Swal.fire("Apartamento actualizado con exito", "", "success");
                      this.router.navigateByUrl("/listadoapartamentos");
                    }
                  },
                  (err) => {
                    console.log(err.error.error.message + " Error de compilacion");
                    Swal.fire("Error", "", "warning");
                  }
                );
              }else{
                Swal.fire("Codigo del apartamento no existe", "", "warning");
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
