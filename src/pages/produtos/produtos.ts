import { API_CONFIG } from './../../config/api.config';
import { ProdutoService } from './../../services/domain/produto.service';
import { ProdutoDTO } from './../../models/produto.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  listProduto: ProdutoDTO[] = [];
  page: number = 0;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private produtoService: ProdutoService, public loadingController: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData();
  }

  loadData() {
    const categoria_id = this.navParams.get('categoria_id');

    const loader = this.presentLoadingDefault();

    this.produtoService.findByCategoria(categoria_id, this.page, 10)
      .finally(() => { loader.dismiss() })
      .subscribe(response => {

      const start = this.listProduto.length;
      
      this.listProduto = this.listProduto.concat(response['content']);
      
      const end = this.listProduto.length - 1;


      this.loadImageUrls(start, end);

    }, err => { });
  }

  loadImageUrls(start: number, end: number) {

    for (let i=start; i < end; i++) {

      const produto = this.listProduto[i];

      this.produtoService.getSmallImageFromBucket(produto.id)
        .subscribe(response => {

          produto.imageUrl = `${API_CONFIG.bucketBaseUrl}/prod${produto.id}-small.jpg`;

        }, err => { });

    }

  }

  showDetail(produto_id: string) {
    this.navCtrl.push('ProdutoDetailPage', {
      produto_id: produto_id
    });
  }

  presentLoadingDefault() {
    let loading = this.loadingController.create({
      content: 'Aguarde...'
    });

    loading.present();

    return loading;

  }

  doRefresh(refresher) {

    this.page = 0;
    this.listProduto = [];

    this.loadData();

    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {

    this.page++;
    this.loadData();

    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }

}
