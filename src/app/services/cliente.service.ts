import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/env/env.dev';
import { Cliente } from 'src/app/models/Cliente';


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private http: HttpClient = inject(HttpClient);

  // Método GET (READ)
  public get():Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${enviroment.URL_API}/clientes/listarClientes`); 
  }

  // Método POST (CREATE)
  public save(cliente: Cliente, id: number = 0): Observable<Cliente> {
    if(id > 0) {
      return this.http.put<Cliente>(`${enviroment.URL_API}/clientes/atualizarCliente/${id}`, cliente);
    }
    return this.http.post<Cliente>(`${enviroment.URL_API}/clientes/cadastrarCliente`, cliente);
  }

  // Método DELETE (DELETE)
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/clientes/excluirCliente/${id}`);
  }

  // Método GET por ID (READ) 
  public find(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${enviroment.URL_API}/clientes/listarClientes/${id}`);
  }
}
