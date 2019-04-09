import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  pessoas = [];
  pessoasID = null;
  cidades = ['Palmas', 'Paraíso', 'Porto Nacional', 'Lajeado'];

  idadePessoaMaisVelha = 0;
  idadePessoaMaisNova = 150;
  nomePessoaMaisVelha = '';
  nomePessoaMaisNova = '';

  mediaIdadeMulher = null;
  mediaIdadeHomens = null;

  constructor() {
    if (localStorage.getItem('pessoas')) {
      this.pessoas = JSON.parse(localStorage.getItem('pessoas'));
    }
    this.pessoaMaisVelha();
    this.pessoaMaisNova();
  }

  submit(nome: string, sexo: string, idade: number, cidade: string) {
    const pessoa = {id: this.pessoasID, nome: nome, sexo: sexo, idade: idade, cidade: cidade};
    this.pessoas.push(pessoa);
    this.pessoasID++;
    this.setInLocalStorage('pessoas', this.pessoas);
    this.pessoaMaisVelha();
    this.pessoaMaisNova();
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
      }
    }
  }

  pessoaMaisNova() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    for (const pessoa of pessoas) {
      if (pessoa.idade < this.idadePessoaMaisNova) {
        this.idadePessoaMaisNova = pessoa.idade;
        this.nomePessoaMaisNova = pessoa.nome;
      }
    }
  }

  mediaIdadeMulheres() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    let cont = 0;
    for (const pessoa of pessoas) {
      if (pessoa.sexo === 'Feminino') {
        this.mediaIdadeMulher = pessoa.idade;
        cont++;
    }
  }
}
