import { Component, Inject } from '@angular/core';
import { AppService } from './app.service';
import { LOCAL_STORAGE, WebStorageService } from 'angular-webstorage-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Questionário Social';
  nome: string = null;
  sexo: string = null;
  idade: number = null;
  cidade: string = null;
  dados: any = [];

  constructor(
    private questionarios: AppService,
    @Inject(LOCAL_STORAGE) private storage: WebStorageService
    ) { }

  submit(form: any) {
    this.questionarios.submit(this.nome, this.sexo, this.idade, this.cidade);
    form.reset();
  }

  saveInLocal(key, val): void {
    console.log('recieved= key:' + key + 'value:' + val);
    this.storage.set(key, val);
    this.dados[key] = this.storage.get(key);
  }

  getFromLocal(key): void {
    console.log('recieved = key:' + key);
    this.dados[key] = this.storage.get(key);
    console.log(this.dados);
  }
}
