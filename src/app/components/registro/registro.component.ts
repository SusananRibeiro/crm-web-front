import { Component, inject, ViewChild, ElementRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { RegistroDeInteracoes } from 'src/app/models/RegistroDeInteracoes';
import { RegistroService } from 'src/app/services/registro.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.css']
})
export class RegistroComponent {

  private service: RegistroService = inject(RegistroService);
  public registros: RegistroDeInteracoes[] = [];


  @ViewChild("formulario") formulario: NgForm | undefined;

  ngOnInit(): void {
    this.get();
  }


  public get() {
    this.service.get().subscribe(
        (response: any) => {
            this.registros = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            // Verifica se a resposta contém um corpo e mensagens de erro
            if (error.error && error.error.messages) {
                // Assume que pode haver várias mensagens, pega a primeira
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar Registro De interações: " + errorMessage)
        })
}

public save(formulario: NgForm) {
    this.service.save(formulario.value, formulario.value.id).subscribe(
        (response: any) => {
            alert("Registro de Interações salvo com sucesso.")
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
            alert("Erro ao salvar o registro de interações: " + errorMessage)
        })
}

public setEditar(registro: RegistroDeInteracoes) {        
    this.service.find(registro.id).subscribe(
        (response: RegistroDeInteracoes) => {
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
            alert("Erro ao salvar Registro De Interacoes: " + errorMessage)
        }
    );
}

public delete(id: number) {
    const confirmDelete = confirm('Tem certeza que deseja excluir este Registro de interações?');
    if (confirmDelete) {
        this.service.delete(id).subscribe(
            (response: any) => {
                console.log(response);
                alert(response.error || 'Registro de interações excluído com sucesso');
                this.get();
            },
        );
    }
}

  // Chamar o MODAL
  abrirModal() {
    this.service.get().subscribe(
        (response: any) => {
            this.registros = response;
        },
        (error: any) => {
            let errorMessage = "Erro desconhecido";

            if (error.error && error.error.messages) {
                errorMessage = error.error.messages[0];
            }
            alert("Erro ao buscar Registro de interações: " + errorMessage)
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
