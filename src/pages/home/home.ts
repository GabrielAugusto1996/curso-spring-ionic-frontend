import { CredenciaisDTO } from './../../models/credenciais.model';
import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public navCtrl: NavController, private menu: MenuController) {

  }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
      console.log(this.creds);
      this.menu.swipeEnable(true);
  }

}
