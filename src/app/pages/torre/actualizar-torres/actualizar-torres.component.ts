import { Component, OnInit } from '@angular/core';
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import {AuthtorreService} from 'src/app/services/torre-services/authtorre.service';
import Swal from 'sweetalert2';

import {torreModel} from 'src/app/models/torre.model';

@Component({
  selector: 'app-actualizar-torres',
  templateUrl: './actualizar-torres.component.html'
})
export class ActualizarTorresComponent implements OnInit {

  torre: torreModel;
  constructor(private authtorre: AuthtorreService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.torre = new torreModel();
    this.llenarDato();
  }

  llenarDato(){
    let id = this.route.snapshot.params['idtorre'];
    if(!id) return;
    console.log(id);
    this.authtorre.validarCodigo(id).subscribe(
      (resp:any) => {
        if(resp != null){
          console.log(resp);
          this.torre.codigo = resp.Codigo;
          this.torre.nombre = resp.Nombre;
          this.torre.cantidad_apto = resp.Cantidad_apto;
          console.log(this.torre);
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
    this.authtorre.validarCodigo(this.torre.codigo).subscribe(
      (resp) => {
        if(resp != null){
          this.authtorre.actualizarTorre(this.torre, this.torre.codigo).subscribe(
            (respu) => {
              if (respu = false) {
                Swal.fire("verificar datos", "", "warning");
              } else {
                Swal.fire("Torre actualizada con exito", "", "success");
                this.router.navigateByUrl("/listadotorres");
              }
            },
            (err) => {
              console.log(err.error.error.message + " Error de compilacion");
              Swal.fire("Error", "", "warning");
            }
          );
        }else{
          Swal.fire("Codigo no existe", "", "warning");
        }
      },
      (err) => {
        console.log(err.error.error.message + " Error de compilacion");
        Swal.fire("Error", "", "warning");
      }
    );
  }
}
