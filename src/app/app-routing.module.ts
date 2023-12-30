import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GerenciamentoComponent } from './components/gerenciamento/gerenciamento.component';

const routes: Routes = [
  { path: 'clientes', component: ClienteComponent },
  { path: 'registros', component: RegistroComponent },
  { path: 'gerenciamentos', component: GerenciamentoComponent },
    // // Página padrão (opcional)
    // { path: '', redirectTo: '/clientes', pathMatch: 'full' },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
