import { environment } from './../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Cliente } from './clientes/cliente';
import { HttpClient } from '@angular/common/http';



@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  apiURL: string = environment.apiURL;

  constructor(private http: HttpClient) {  }

  salvar(cliente: Cliente): Observable<Cliente> {
      return this.http.post<Cliente>(`${this.apiURL}/api/clientes`, cliente);
  }

  atualizar(cliente: Cliente): Observable<any> {
    return this.http.put<Cliente>(`${this.apiURL}/api/clientes/${cliente.id}`, cliente);
}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.apiURL}/api/clientes`);
  }

  getClienteById(id: number): Observable<Cliente> {
    return this.http.get<any>(`${this.apiURL}/api/clientes/${id}`);
  }

  excluirCliente(cliente: Cliente): Observable<any> {
    return this.http.delete<any>(`${this.apiURL}/api/clientes${cliente.id}`);
  }
}
