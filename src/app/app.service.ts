import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppService {
  questionarios = [];
  idQuestionario = 1;
  cidades = ['Palmas', 'Paraíso', 'Porto Nacional', 'Lajeado'];

  constructor() { }

  submit(nome: string, sexo: string, idade: number, cidade: string) {
    const questionario = {
      id: this.idQuestionario,
      // tslint:disable-next-line:object-literal-shorthand
      nome: nome,
      // tslint:disable-next-line:object-literal-shorthand
      sexo: sexo,
      // tslint:disable-next-line:object-literal-shorthand
      idade: idade,
      // tslint:disable-next-line:object-literal-shorthand
      cidade: cidade
    };
    this.questionarios.push(questionario);
    this.idQuestionario++;
  }

  listaDeCidades() {
    return this.cidades;
  }

  listaDeNomes() {
    return this.questionarios;
  }

  dadosEstatisticos() {
    // let estatisticas = [];
    // let idEstatistica = 1;
    // let pessoaMaisVelha = -1;
    // let pessoaMaisNova = 151;
    // let idadeDasMulheres;
    // let idadeDosHomens;

  }
}
