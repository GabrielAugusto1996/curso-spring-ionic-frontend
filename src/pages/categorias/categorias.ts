import { CategoriaDTO } from './../../models/categoria.model';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  listCategoria: CategoriaDTO[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.categoriaService.findAll().subscribe(res => {
      this.listCategoria = res;
      console.log(this.listCategoria);
    }, err => {
      console.log(err);
    });
  }

}
