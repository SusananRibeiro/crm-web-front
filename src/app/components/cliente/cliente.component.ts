import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Cliente } from '../../models/Cliente';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent {

  private service: ClienteService = inject(ClienteService);
  public clientes: Cliente[] = [];


  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }


  public get() {
    this.service.get().subscribe(
        (response: any) => {
            this.clientes = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar cliente: " + errorMessage)
        }
    )
}

public save(formulario: NgForm) {

    this.service.save(formulario.value, formulario.value.id).subscribe(
        (response: any) => {
            alert("Cliente salvo com sucesso.")
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
            alert("Erro ao salvar cliente: " + errorMessage)
        }
    )
}

public setEditar(cliente: Cliente) {        
    this.service.find(cliente.id).subscribe(
        (response: Cliente) => {
            this.abrirModal()
            this.formulario?.setValue(response);
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao salvar cliente: " + errorMessage)
        }
    );
}


public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este cliente?');

    if (confirmDelete) {
        this.service.delete(id).subscribe(
            (response: any) => {
                console.log(response);
                alert(response.error || 'Cliente excluído com sucesso');
                this.get();
            },
        );
    }
}

  // Chamar o MODAL
  abrirModal() {
    this.service.get().subscribe(
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
    if(modelDiv != null) {
       modelDiv.style.display = 'none'; 
    }
    
  }

}
