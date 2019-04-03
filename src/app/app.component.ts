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
  cidade = null;

  constructor(private questionarios: AppService) { }

  submit(form) {
    this.questionarios.submit(this.nome, this.sexo, this.idade, this.cidade);
    form.reset();
  }
}
