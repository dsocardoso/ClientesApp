import { Component, OnInit } from '@angular/core';

import { Cliente } from '../cliente';
import { ClientesService } from '../../clientes.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  id: number;

  constructor(
    private service: ClientesService,
    private router: Router,
    private activatedRoute: ActivatedRoute
    ) {
      this.cliente = new Cliente();
   }

  // buscar dados do cliente por id
  ngOnInit(): void {
    const params = this.activatedRoute.params;
    if (params && params['_value'].id){
      this.id = params['_value'].id;
      this.service.getClienteById(this.id).subscribe(
        response => {
          this.cliente = response;
        }
      );
    }
  }

  // salvar dados
  onSubmit(){
   if (this.id) {
    this.service.atualizar(this.cliente)
    .subscribe(response => {
      this.success = true;
      this.errors = [];
    }, errorResponse => {
      this.errors = ['Erro ao atualizar o cliente'];
      this.success = false;
    });
   } else {
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
  }

  voltarParaListagem(){
    this.router.navigate(['/clientes/lista']);
  }

}
