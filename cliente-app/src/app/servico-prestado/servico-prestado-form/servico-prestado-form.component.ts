import { ServicoPrestadoService } from './../../servico-prestado.service';
import { ServicoPrestado } from './../servicoprestado';
import { Cliente } from './../../clientes/cliente';
import { Component, OnInit } from '@angular/core';
import { ClientesService } from '../../clientes.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-servico-prestado-form',
  templateUrl: './servico-prestado-form.component.html',
  styleUrls: ['./servico-prestado-form.component.css']
})
export class ServicoPrestadoFormComponent implements OnInit {

  clientes: Cliente[] = [];
  servico: ServicoPrestado;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(
    private clienteService: ClientesService,
    private servicoPrestadoService: ServicoPrestadoService,
    private router: Router) {
    this.servico = new ServicoPrestado();
  }

  ngOnInit(): void {
    this.clienteService
    .getClientes()
    .subscribe(response =>{
      this.clientes = response;
    });
  }

  onSubmit(){
    this.servicoPrestadoService
    .salvar(this.servico)
    .subscribe(response => {
      this.mensagemSucesso = 'Serviço cadastrado com sucesso';
    },
    onError =>{
      this.mensagemErro = 'Ocorreu um erro ao cadastrar o serviço';
    });
  }
  voltarLista(){
    this.router.navigate(['/servicos-prestados/lista']);
  }
}
