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
      nome,
      sexo,
      idade,
      cidade
    };
    this.questionarios.push(questionario);
    this.idQuestionario++;
  }

  listaDeCidades() {
    return this.cidades;
  }

  dadosEstatisticos() {
    let estatisticas = [];
    let pessoaMaisVelha = -1;
    let pessoaMaisNova = 151;
    let idadeDasMulheres;
    let idadeDosHomens;
  }
}
