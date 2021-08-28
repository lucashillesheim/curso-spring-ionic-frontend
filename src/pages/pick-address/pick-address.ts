import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';

@IonicPage()
@Component({
    selector: 'page-pick-address',
    templateUrl: 'pick-address.html',
})
export class PickAddressPage {

    items: Array<EnderecoDTO>

    constructor(public navCtrl: NavController, public navParams: NavParams) {
    }

    ionViewDidLoad() {
        this.items = [{
            id: "1",
            logradouro: "Rua Flores",
            numero: "300",
            complemento: "Apto 303",
            bairro: "Copacabana",
            cep: "28580000",
            cidade: {
                id: "1",
                nome: "Rio de Janeiro",
                estado: {
                    id: "1",
                    nome: "Rio de Janeiro"
                }
            }
        }, {
            id: "2",
            logradouro: "Avenida Matos",
            numero: "105",
            complemento: "",
            bairro: "Centro",
            cep: "28700000",
            cidade: {
                id: "1",
                nome: "Rio de Janeiro",
                estado: {
                    id: "1",
                    nome: "Rio de Janeiro"
                }
            }
        }]
    }

}
