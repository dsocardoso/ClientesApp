import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Usuario } from './usuario';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  username: string;
  password: string;
  cadastrando: boolean;
  mensagemSucesso: string;
  mensagemErro: string;

  constructor(private router: Router, private authService: AuthService) { }

  onSubmit() {
    this.authService.tentarLogar(this.username, this.password)
    .subscribe(response => {
      const accessToken = JSON.stringify(response);
      localStorage.setItem('access_token', accessToken);
      this.router.navigate(['/home']);
    }, onError =>{
      this.mensagemErro = 'Usuário e/ou senha inválidos';
    });
  }

  preparaCadastrar(event){
    event.preventDefault();
    this.cadastrando = true;
  }

  cancelaCadastro() {
    this.cadastrando = false;
  }

  cadastrar() {
    console.log('chegou no evento');
    const usuario: Usuario = new Usuario();
    usuario.username = this.username;
    usuario.password = this.password;
    this.authService.salvar(usuario)
    .subscribe(response =>{
      this.mensagemSucesso = 'Cadastro realizado com sucesso. Efetue o login.';
      this.mensagemErro = '';
      this.cadastrando = false;
      this.username = '';
      this.password = '';
    }, errorResponse => {
      this.mensagemErro = 'Ocorreu um erro. Tente Novamente mais tarde.';
      this.mensagemSucesso = null;
    });
  }

}
