import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from './../../services/domain/cliente.service';
import { ClienteDTO } from './../../models/cliente.model';
import { StorageService } from './../../services/storage.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente: ClienteDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              private storageService: StorageService, private clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storageService.getLocalUser();
    
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(response => {

        this.cliente = response;
        this.getImageIfExists();
      }, err => {});
    }
  }

  getImageIfExists() {
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(response => {
      this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/cp${this.cliente.id}.jpg`;
    }, error => {});
  }

}
