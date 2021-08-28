import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CartItem } from '../../models/cart-item';
import { ClienteDTO } from '../../models/cliente.dto';
import { EnderecoDTO } from '../../models/endereco.dto';
import { PedidoDTO } from '../../models/pedido.dto';
import { CartService } from '../../services/domain/cart.service';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
    selector: 'page-order-confirmation',
    templateUrl: 'order-confirmation.html',
})
export class OrderConfirmationPage {

    pedido: PedidoDTO;
    cartItems: Array<CartItem>;
    cliente: ClienteDTO;
    endereco: EnderecoDTO;

    constructor(
        public navCtrl: NavController,
        public navParams: NavParams,
        public cartService: CartService,
        public clienteService: ClienteService) {

        this.pedido = this.navParams.get('pedido');
    }

    ionViewDidLoad() {
        this.cartItems = this.cartService.getCart().itens;

        this.clienteService.findById(this.pedido.cliente.id)
            .subscribe(response => {
                this.cliente = response as ClienteDTO;
                this.endereco = this.findEndereco(this.pedido.enderecoDeEntrega.id, response['enderecos']);
            }, error => {
                this.navCtrl.setRoot('HomePage');
            });
    }

    private findEndereco(id: string, enderecos: EnderecoDTO[]): EnderecoDTO {
        return enderecos.find(endereco => endereco.id == id);
    }

    total() {
        return this.cartService.total();
    }

}
