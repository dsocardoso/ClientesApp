import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from './login/usuario';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiURL: string = environment.apiURL + '/api/usuarios';

  constructor(private httpCliente: HttpClient) { }

  salvar(usuario: Usuario): Observable<any> {
    console.log('Chegou dentro da service');
    return this.httpCliente.post<any>(this.apiURL, usuario);
  }
}
