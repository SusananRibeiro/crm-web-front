import { Component, ViewChild, inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from 'src/app/models/Cliente';
import { GerenciamentoDeOportunidadeDeVenda } from 'src/app/models/GerenciamentoDeOportunidadeDeVenda';
import { ClienteService } from 'src/app/services/cliente.service';
import { GerenciamentoService } from 'src/app/services/gerenciamento.service';

@Component({
  selector: 'app-gerenciamento',
  templateUrl: './gerenciamento.component.html',
  styleUrls: ['./gerenciamento.component.css']
})
export class GerenciamentoComponent {


  private service: GerenciamentoService = inject(GerenciamentoService);
  private clienteService: ClienteService = inject(ClienteService);
  public gerenciamentos: GerenciamentoDeOportunidadeDeVenda[] = [];
  public clientes: Cliente[] = [];
  public clienteId: number | null = null;

  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
      this.get();
  }

  public get() {
      this.service.get().subscribe(
          (response: any) => {
              this.gerenciamentos = response;
          },
          (error: any) => {
              let errorMessage = "Erro desconhecido";
  
              // Verifica se a resposta contém um corpo e mensagens de erro
              if (error.error && error.error.messages) {
                  // Assume que pode haver várias mensagens, pega a primeira
                  errorMessage = error.error.messages[0];
              }
              alert("Erro: " + errorMessage)
          }
      )
  }

  public save(formulario: NgForm) {
      this.service.save(formulario.value, formulario.value.id).subscribe(
          (response: any) => {
              alert("Gerenciamento de Oportunidade de Venda salvo com sucesso.")
              formulario.reset();
              this.get();
              this.fecharModal();
          },
          (error: any) => {
              let errorMessage = "Erro desconhecido";

              // Verifica se a resposta contém um corpo e mensagens de erro
              if (error.error && error.error.messages) {
                  // Assume que pode haver várias mensagens, pega a primeira
                  errorMessage = error.error.messages[0];
              }
              alert("Erro: " + errorMessage)
          }
      )
  }

  public setEditar(gerenciamento: GerenciamentoDeOportunidadeDeVenda) {        
      this.service.find(gerenciamento.id).subscribe(
          (response: GerenciamentoDeOportunidadeDeVenda) => {
              this.abrirModal()
              this.formulario?.setValue(response);
              this.clienteId = response.clienteId;
          },
          (error: any) => {
              let errorMessage = "Erro desconhecido";
  
              if (error.error && error.error.messages) {
                  errorMessage = error.error.messages[0];
              }
              alert("Erro ao salvar Gerenciamento de Oportunidade de Venda: " + errorMessage)
          }
      );
  }

  public delete(id: number) {
      const confirmDelete = confirm('Tem certeza que deseja excluir este Gerenciamento de Oportunidade de Venda?');

      if (confirmDelete) {
          this.service.delete(id).subscribe(
              (response: any) => {
                  console.log(response);
                  alert(response.error || 'Gerenciamento de Oportunidade de Venda excluído com sucesso');
                  this.get();
              },
          );
      }
  }

  abrirModal() {
       this.clienteService.get().subscribe(
           (response: any) => {
               this.clientes = response;
           },
           (error: any) => {
               let errorMessage = "Erro desconhecido";

               if (error.error && error.error.messages) {
                   errorMessage = error.error.messages[0];
               }
               alert("Erro ao buscar clientes: " + errorMessage)
           }
       )

      const modelDiv = document.getElementById('janelaModal');
      if (modelDiv != null) {
          modelDiv.style.display = 'block';
      }
  }

  fecharModal() {
      const modelDiv = document.getElementById('janelaModal');
      if (modelDiv != null) {
          modelDiv.style.display = 'none';
      }
      this.formulario?.reset();   
      this.clienteId = null;
  }


  onClienteSelectionChange(clienteId: number | null) {
      this.clienteService.get().subscribe(
          (response: any) => {
              this.clientes = response;
          },
          (error: any) => {
              let errorMessage = "Erro desconhecido";
  
              if (error.error && error.error.messages) {
                  errorMessage = error.error.messages[0];
              }
              alert("Erro ao buscar clientes: " + errorMessage);
          }
      );
  }

}
