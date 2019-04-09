import { Component } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Questionário Social';
  nome = null;
  sexo = null;
  idade = null;
  cidade = '';

  /**
   * O construtor da classe
   * @param appService Uma instânia de AppService
   */
  constructor(
    private appService: AppService
    ) { }

  /**
   * Obtém os dados vinculados ao formulário e interage com o serviço
   * AppService para salvar a notícia.
   * @param form Uma referência ao formulário declarado no template.
   */
  submit(form) {
    this.appService.submit(this.nome, this.sexo, this.idade, this.cidade);
    form.reset();
  }

  delete() {
    this.appService.deleteLocalStorage();
  }
}
