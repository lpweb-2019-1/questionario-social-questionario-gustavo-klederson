import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  pessoas = [];
  pessoasID = 1;
  cidades = ['Palmas', 'Paraíso', 'Porto Nacional', 'Lajeado'];

  idadePessoaMaisVelha = 0;
  idadePessoaMaisNova = 150;
  nomePessoaMaisVelha = '';
  nomePessoaMaisNova = '';

  constructor() {}

  submit(nome: string, sexo: string, idade: number, cidade: string) {
    const pessoa = {
      id: this.pessoasID,
      nome,
      sexo,
      idade,
      cidade
    };
    this.pessoas.push(pessoa);
    this.pessoasID++;
    this.setInLocalStorage('pessoas', this.pessoas);
  }

  setInLocalStorage(key: string, data: any) {
    try {
      localStorage.setItem('pessoas', JSON.stringify(this.pessoas));
    } catch (e) {
      console.error('Erro ao salvar dados no Local Storage!', e);
    }
  }

  getFromLocalStorage(key: string) {
    try {
      return JSON.parse(localStorage.getItem('pessoas'));
    } catch (e) {
      console.error('Erro ao obter dados do Local Storage!', e);
      return null;
    }
  }

  listaDeCidades() {
    return this.cidades;
  }

  pessoaMaisVelha() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    for (const pessoa of pessoas) {
      if (pessoa.idade > this.idadePessoaMaisVelha) {
        this.idadePessoaMaisVelha = pessoa.idade;
        this.nomePessoaMaisVelha = pessoa.nome;
        // localStorage.setItem('aPessoaMaisVelha', JSON.stringify(pessoa.nome, pessoa.idade));
        return this.idadePessoaMaisVelha;
      }
    }
  }

  pessoaMaisNova() {
    for (const pessoa of this.pessoas) {
      if (pessoa.idade > this.idadePessoaMaisNova) {
        this.nomePessoaMaisNova = pessoa.nome;
        this.idadePessoaMaisNova = pessoa.idade;
        // localStorage.setItem('aPessoaMaisNova', JSON.stringify(pessoa.nome, pessoa.idade));
      }
    }
  }
}
