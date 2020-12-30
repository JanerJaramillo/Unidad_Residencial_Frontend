import { Component, OnInit } from '@angular/core';
import {AuthapartamentoService} from 'src/app/services/apartamento-services/authapartamento.service';
import {Router} from "@angular/router";
import Swal from 'sweetalert2';

import {apartamentoModel} from 'src/app/models/apartamento.model';

@Component({
  selector: 'app-listado-apartamentos',
  templateUrl: './listado-apartamentos.component.html'
})
export class ListadoApartamentosComponent implements OnInit {

  apartamento: apartamentoModel;
  constructor(private authapartamento: AuthapartamentoService, private router: Router) { }

  ngOnInit(): void {
    this.onList();
  }

  filtrar(id:number){
    let link = [`/actualizarapartamentos/${id}`];
    this.router.navigate(link);
    console.log(link);
  }

  eliminar(id:number){
    this.authapartamento.eliminarApartamento(id).subscribe(
      (resp:any) => {
        if(resp = false){
          console.log("No se pudo eliminar el apartamento");
        }else{
          Swal.fire("Apartamento eliminado con exito", "", "success");
          this.router.navigateByUrl("/home");
        }
      },
      (err) =>{
        console.log(err.error.error.message + " Error de compilacion");
      }
    );
  }

  onList(){
    this.authapartamento.listarApartamentos().subscribe(
      (resp:apartamentoModel) => {
        if(resp != null) {
          console.log(resp);
          this.apartamento = resp;
        }else{
          console.log("Nose pudo listar");
        }
      },
      (err) => {
        console.log(err.error.error.message + " Error de compilacion");
      }
    )
  }

}
