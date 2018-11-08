import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  listProduto: ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams, private produtoService: ProdutoService) {
  }

  ionViewDidLoad() {

    const categoria_id = this.navParams.get('categoria_id');

    this.produtoService.findByCategoria(categoria_id).subscribe(response => {

      this.listProduto = response['content'];

      this.loadImageUrls();

    }, err => { });

  }

  loadImageUrls() {

    for (const produto of this.listProduto) {

      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {

          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`;

        }, err => { });

    }

  }

}
