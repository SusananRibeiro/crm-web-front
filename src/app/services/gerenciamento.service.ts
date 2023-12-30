import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/env/env.dev';
import { GerenciamentoDeOportunidadeDeVenda } from '../models/GerenciamentoDeOportunidadeDeVenda';

@Injectable({
  providedIn: 'root'
})
export class GerenciamentoService {

  
  private http: HttpClient = inject(HttpClient);

  // Método GET (READ)
  public get():Observable<GerenciamentoDeOportunidadeDeVenda[]> {
    return this.http.get<GerenciamentoDeOportunidadeDeVenda[]>(`${enviroment.URL_API}/gerenciamentos/listarGerenciamento`); 
  }

  // Método POST (CREATE)
  public save(gerenciamento: GerenciamentoDeOportunidadeDeVenda, id: number = 0): Observable<GerenciamentoDeOportunidadeDeVenda> {
    if(id > 0) {
      return this.http.put<GerenciamentoDeOportunidadeDeVenda>(`${enviroment.URL_API}/gerenciamentos/atualizarGerenciamento/${id}`, gerenciamento);
    }
    return this.http.post<GerenciamentoDeOportunidadeDeVenda>(`${enviroment.URL_API}/gerenciamentos/cadastrarGerenciamento`, gerenciamento);
  }

  // Método DELETE (DELETE)
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/gerenciamentos/excluirGerenciamento/${id}`);
  }

  // Método GET por ID (READ) 
  public find(id: number): Observable<GerenciamentoDeOportunidadeDeVenda> {
    return this.http.get<GerenciamentoDeOportunidadeDeVenda>(`${enviroment.URL_API}/gerenciamentos/listarGerenciamento/${id}`);
  }

 
}
