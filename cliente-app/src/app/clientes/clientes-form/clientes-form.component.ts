import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-clientes-form',
  templateUrl: './clientes-form.component.html',
  styles: [
  ]
})
export class ClientesFormComponent implements OnInit {

  cliente: Cliente;
  success = false;
  errors: string[];

  constructor(private service: ClientesService, private router: Router) {
      this.cliente = new Cliente();
   }

  ngOnInit(): void {
  }

  // salvar dados
  onSubmit(){
   this.service
   .salvar(this.cliente)
   .subscribe( response =>{
     this.success = true;
     this.errors = [];
     this.cliente = response;
   }, errorResponse => {
     this.success = false;
     this.errors = errorResponse.error.errors;
   });
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes-lista']);
  }

}
