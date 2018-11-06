import { AuthService } from './../../services/auth.service';
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

  constructor(public navCtrl: NavController, private menu: MenuController, private authService: AuthService) {

  }

  login() {
    this.authService.authenticate(this.creds).subscribe(response => {
      this.authService.loginSucess(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    }, err => {});
  }

  ionViewWillEnter() {
      this.menu.swipeEnable(false);
  }

  ionViewDidLeave() {
      this.menu.swipeEnable(true);
  }

}
