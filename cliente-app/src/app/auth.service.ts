import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from '../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL + '/api/usuarios';
  tokenURL: string = environment.apiURL + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(private httpCliente: HttpClient) { }

  obterToken() {
    const tokenString = localStorage.getItem('access_token');
    if (tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }
    return null;
  }

  isAuthenticated(): boolean {
    const token = this.obterToken();
    if (token){
      const expired = this.jwtHelper.isTokenExpired(token);
      return !expired;
    }
    return false;
  }

  salvar(usuario: Usuario): Observable<any> {
    console.log('Chegou dentro da service');
    return this.httpCliente.post<any>(this.apiURL, usuario);
  }

  tentarLogar(username: string, password: string): Observable<any> {
    const params = new HttpParams()
    .set('username', username)
    .set('password', password)
    .set('grant_type', 'password');
    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientID}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    };
    return this.httpCliente.post(this.tokenURL, params.toString(), {headers});
  }

  encerrarSessao() {
    localStorage.removeItem('access_token');
  }

  getUsuarioAutenticado() {
    const token = this.obterToken();
    if (token) {
      const usuario = this.jwtHelper.decodeToken(token).user_name;
      return usuario;
    }
    return null;
  }
}
