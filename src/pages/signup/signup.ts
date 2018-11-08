import { ClienteService } from './../../services/domain/cliente.service';
import { CidadeDTO } from './../../models/cidade.model';
import { EstadoDTO } from './../../models/estado.model';
import { EstadoService } from './../../services/domain/estado.service';
import { CidadeService } from './../../services/domain/cidade.service';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;

  estados: EstadoDTO[];
  cidades: CidadeDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    public formBuilder: FormBuilder, public cidadeService: CidadeService,
    public estadoService: EstadoService, public clienteService: ClienteService,
    public alertController: AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(120)]],
      email: ['', [Validators.required, Validators.email]],
      tipo: ['', [Validators.required]],
      cpfOuCnpj: ['', [Validators.required, Validators.minLength(11), Validators.maxLength(14)]],
      senha: ['', [Validators.required]],
      logradouro: ['', [Validators.required]],
      numero: ['', [Validators.required]],
      complemento: ['', []],
      bairro: ['', []],
      cep: ['', [Validators.required]],
      telefone1: ['', [Validators.required]],
      telefone2: ['', []],
      telefone3: ['', []],
      estadoId: [null, [Validators.required]],
      cidadeId: [null, [Validators.required]]
    });

  }

  ionViewDidLoad() {

    this.estadoService.findAll().subscribe(response => {

      this.estados = response;
      this.formGroup.controls.estadoId.setValue(this.estados[0].id);
      this.updateCidades();
    }, err => { });

  }

  updateCidades() {

    const estadoId = this.formGroup.value.estadoId;

    this.cidadeService.findAll(estadoId).subscribe(response => {

      this.cidades = response;

      this.formGroup.controls.cidadeId.setValue(null);

    }, err => { });
  }

  cadastrarUsuario() {

    this.clienteService.inserirUsuario(this.formGroup.value)
      .subscribe(response => {
        this.mostrarCadastroUsuarioSucesso();
      }, err => { });
  }

  mostrarCadastroUsuarioSucesso() {

    let alert = this.alertController.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso!',
      enableBackdropDismiss: false,
      buttons: [
        {
          text: 'Ok',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });

    alert.present();
  }

}
