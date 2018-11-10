import { EnderecoDTO } from './../../models/endereco.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-pick-address',
  templateUrl: 'pick-address.html',
})
export class PickAddressPage {

  listEndereco: EnderecoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  
    this.listEndereco = [
      {
        id: "1",
        logradouro: "Rua Quinze de Novembro",
        numero: "300",
        complemento: "Apto 200",
        bairro: "Santa Mônica",
        cep: "35650000",
        cidade: {
          id: "1",
          nome: "Uberlândia",
          estado: {
            id: "1",
            nome: "Minas Gerais"
          }
        }
      },
      {
        id: "2",
        logradouro: "Rua Alexandre Toledo da Silva",
        numero: "250",
        complemento: "Apto 100",
        bairro: "Gorete",
        cep: "31110680",
        cidade: {
          id: "3",
          nome: "São Paulo",
          estado: {
            id: "2",
            nome: "São Paulo"
          }
        }
      }
    ];

  }

}
