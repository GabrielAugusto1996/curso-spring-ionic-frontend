import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produto-detail',
  templateUrl: 'produto-detail.html',
})
export class ProdutoDetailPage {

  produto: ProdutoDTO;

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public produtoService: ProdutoService, public cartService: CartService) {
  }

  ionViewDidLoad() {

    const produto_id = this.navParams.get('produto_id');

    this.produtoService.findById(produto_id).subscribe(response => {

      this.produto = response;

      this.getImageUrlIfExists();

    }, err => {});
  }

  getImageUrlIfExists() {

    this.produtoService.getImageFromBucket(this.produto.id).subscribe(response => {
      this.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${this.produto.id}.jpg`;
    }, err => {})

  }

  addToCart(produto: ProdutoDTO) {

    this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');

  }

}
