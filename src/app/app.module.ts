import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RegistroComponent } from './components/registro/registro.component';
import { GerenciamentoComponent } from './components/gerenciamento/gerenciamento.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ClienteComponent,
    RegistroComponent,
    GerenciamentoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
