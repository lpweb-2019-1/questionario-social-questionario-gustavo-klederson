import { Injectable } from '@angular/core';
import { stringify } from '@angular/core/src/util';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  pessoas = [];
  pessoasID = null;
  cidades = ['Palmas', 'Paraíso', 'Porto Nacional', 'Lajeado'];

  idadePessoaMaisVelha = null;
  idadePessoaMaisNova = null;
  nomePessoaMaisVelha = '';
  nomePessoaMaisNova = '';

  mediaIdadeMulheres = null;
  mediaIdadeHomens = null;
  totalHomens = 0;
  totalMulheres = 0;

  mediaIdadeCidades = [];

  constructor() {
    if (localStorage.getItem('pessoas')) {
      this.pessoas = JSON.parse(localStorage.getItem('pessoas'));
    }
    if (localStorage.length > 0) {
      this.idadePessoa();
      this.mediaIdades();
      // this.mediaCidades();
      // this.porcentagemPessoaPorCidade();
    }
  }

  submit(nome: string, sexo: string, idade: number, cidade: string) {
    const pessoa = {id: this.pessoasID, nome, sexo, idade, cidade};
    this.pessoas.push(pessoa);
    this.pessoasID++;
    this.setInLocalStorage('pessoas', this.pessoas);
    this.idadePessoa();
    this.mediaIdades();
    // this.mediaCidades();
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

  deleteLocalStorage() {
    try {
      localStorage.clear();
    } catch (e) {
      console.error('Erro ao excluir dados do Local Storage!', e);
    }
  }

  listaDeCidades() {
    return this.cidades;
  }

  idadePessoa() {
    this.idadePessoaMaisVelha = 0;
    this.idadePessoaMaisNova = 150;

    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    for (const pessoa of pessoas) {
      if (pessoa.idade > this.idadePessoaMaisVelha) {
        this.idadePessoaMaisVelha = pessoa.idade;
        this.nomePessoaMaisVelha = pessoa.nome;
      }
      if (pessoa.idade < this.idadePessoaMaisNova) {
        this.idadePessoaMaisNova = pessoa.idade;
        this.nomePessoaMaisNova = pessoa.nome;
      }
    }
  }

  mediaIdades() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    for (const pessoa of pessoas) {
      if (pessoa.sexo === 'Feminino') {
        this.mediaIdadeMulheres = this.mediaIdadeMulheres + pessoa.idade;
        this.totalMulheres++;
      }
      if (pessoa.sexo === 'Masculino') {
        this.mediaIdadeHomens = this.mediaIdadeHomens + pessoa.idade;
        this.totalHomens++;
      }
    }
    if (this.totalMulheres === 0){
      this.mediaIdadeMulheres = 0;
    }
    else {
      this.mediaIdadeMulheres = this.mediaIdadeMulheres / this.totalMulheres;
    }
    if (this.totalHomens === 0) {
      this.mediaIdadeHomens = 0;
    }
    else {
      this.mediaIdadeHomens = this.mediaIdadeHomens / this.totalHomens;
    }
  }

  mediaCidades() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    let media = 0;
    let total = 0;
    for (let i = 0; i < this.cidades.length; i++) {
      for (this.cidades[i] of pessoas) {
        media += pessoas.pessoa.idade;
        total++;
      }
      media /= total;
      this.mediaIdadeCidades.push(media[i]);
      media = 0;
    }
    this.mediaIdadeMulheres = this.mediaIdadeMulheres / this.totalMulheres;
    this.mediaIdadeHomens = this.mediaIdadeHomens / this.totalHomens;
  }

  porcentagemPessoaPorCidade() {
    const pessoas = JSON.parse(localStorage.getItem('pessoas'));
    let result = {}

    pessoas.forEach(p => {
      if(result[p.cidade]){
        result[p.cidade].contT += 1
        if(p.sexo === 'Masculino'){
          result[p.cidade].contM +=1
        }
        else{
          result[p.cidade].contF +=1
        }
      }
      else{
        result[p.cidade] = {
          cidade: p.cidade,
          contM: p.sexo === 'Masculino' ? 1: 0,
          contF: p.sexo === 'Feminino' ? 1: 0,
          contT: 1
        }
      }
    });

      return Object.values(result)
  }
}
