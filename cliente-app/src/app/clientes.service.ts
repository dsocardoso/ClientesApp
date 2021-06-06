import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private http: HttpClient) {  }

  salvar(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>('http://localhost:8080/api/clientes', cliente);
  }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>('http://localhost:8080/api/clientes');
  }
}