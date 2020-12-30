import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router } from "@angular/router";
import {AuthtorreService} from 'src/app/services/torre-services/authtorre.service';
import Swal from 'sweetalert2';

import {torreModel} from 'src/app/models/torre.model';

@Component({
  selector: 'app-listado-torres',
  templateUrl: './listado-torres.component.html'
})
export class ListadoTorresComponent implements OnInit {

  torre: torreModel;

  constructor(private authtorre: AuthtorreService, private router: Router, 
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.onList();
  }

  filtrar(id:number){
    let link = [`/actualizartorres/${id}`];
    this.router.navigate(link);
    console.log(link);
  }

  eliminar(id:number){
    this.authtorre.eliminarTorre(id).subscribe(
      (resp:any) => {
        if(resp = false){
          console.log("No se pudo eliminar la torre");
        }else{
          Swal.fire("Torre eliminada con exito", "", "success");
          this.router.navigateByUrl("/home");
        }
      },
      (err) =>{
        console.log(err.error.error.message + " Error de compilacion");
      }
    );
  }

  onList(){
    this.authtorre.listarTorres().subscribe(
      (resp:torreModel) => {
        if(resp != null){
          console.log(resp);
          this.torre = resp;
        }else{
          console.log("No se pudo listar");
        }
      },
      (err) =>{
        console.log(err.error.error.message + " Error de compilacion");
      }
    );
  }
}
