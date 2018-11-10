import { ProdutoDTO } from './../../models/produto.model';
import { CartService } from './../../services/domain/cart.service';
import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { CartItem } from './../../models/cart-item';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html',
})
export class CartPage {

  items: CartItem[];

  constructor(public navCtrl: NavController, public navParams: NavParams, 
              public cartService: CartService, public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
  
    const cart = this.cartService.getCart();

    this.items = cart.items;

    this.loadImageUrls();

  }

  loadImageUrls() {

    for (const item of this.items) {

      this.produtoService.getSmallImageFromBucket(item.produto.id)
        .subscribe(response => {

          item.produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${item.produto.id}-small.jpg`;

        }, err => { });

    }

  }

  removeItem(produto: ProdutoDTO) {
    this.items = this.cartService.removeProduto(produto).items;
  }

  increaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.increaseQuantity(produto).items;
  }

  decreaseQuantity(produto: ProdutoDTO) {
    this.items = this.cartService.decreaseQuantity(produto).items;
  }

  total() : number {
    return this.cartService.total();
  }

  continuarComprando() {
    this.navCtrl.setRoot('CategoriasPage');
  }

  finalizarPedido() {
    this.navCtrl.setRoot('PickAddressPage');
  }

}
