import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/env/env.dev';
import { RegistroDeInteracoes } from 'src/app/models/RegistroDeInteracoes';

@Injectable({
  providedIn: 'root'
})
export class RegistroService {

  private http: HttpClient = inject(HttpClient);

  // Método GET (READ)
  public get():Observable<RegistroDeInteracoes[]> {
    return this.http.get<RegistroDeInteracoes[]>(`${enviroment.URL_API}/registros/listarRegistro`); 
  }

  // Método POST (CREATE)
  public save(registro: RegistroDeInteracoes, id: number = 0): Observable<RegistroDeInteracoes> {
    if(id > 0) {
      return this.http.put<RegistroDeInteracoes>(`${enviroment.URL_API}/registros/atualizarRegistro/${id}`, registro);
    }
    return this.http.post<RegistroDeInteracoes>(`${enviroment.URL_API}/registros/cadastrarRegistro`, registro);
  }

  // Método DELETE (DELETE)
  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${enviroment.URL_API}/registros/excluirRegistro/${id}`);
  }

  // Método GET por ID (READ) 
  public find(id: number): Observable<RegistroDeInteracoes> {
    return this.http.get<RegistroDeInteracoes>(`${enviroment.URL_API}/registros/listarRegistro/${id}`);
  }
  
}
