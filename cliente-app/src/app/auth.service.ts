import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL + '/api/usuarios';
  tokenURL: string = environment.apiURL + environment.obterTokenUrl;
  clientID: string = environment.clientId;
  clientSecret: string = environment.clientSecret;

  constructor(private httpCliente: HttpClient) { }

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
}
