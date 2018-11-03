import { Component } from '@angular/core';
import { NavController, IonicPage, MenuController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController, private menu: MenuController) {

  }

  login() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
      this.menu.swipeEnable(true);
  }

}
