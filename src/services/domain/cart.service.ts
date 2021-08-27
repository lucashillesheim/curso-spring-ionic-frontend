import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
import { CartItem } from "../../models/cart-item";
import { ProdutoDTO } from "../../models/produto.dto";
import { StorageService } from "../storage.service";

@Injectable()
export class CartService {

    constructor(public storage: StorageService) { }

    createOrClearCart(): Cart {
        let cart: Cart = { itens: [] };
        this.storage.setCart(cart);
        return cart
    }

    getCart(): Cart {
        let cart: Cart = this.storage.getCart();
        return cart == null ? this.createOrClearCart() : cart;
    }

    addProduto(produto: ProdutoDTO): Cart {
        return this.handleItem(produto, (_, position, cart) => {
            position === -1 && cart.itens.push({ produto, quantidade: 1 });
        });
    }

    removeProduto(produto: ProdutoDTO): Cart {
        return this.handleItem(produto, (_, position, cart) => {
            position != -1 && this.removeItem(position, cart);
        });
    }

    removeItem(position: number, cart: Cart) {
        cart.itens.splice(position, 1);
    }

    increaseQuantity(produto: ProdutoDTO): Cart {
        return this.handleItem(produto, (cartItem, position) => {
            position != -1 && cartItem.quantidade++;
        });
    }

    decreaseQuantity(produto: ProdutoDTO): Cart {
        return this.handleItem(produto, (cartItem, position, cart) => {
            position != -1 && cartItem.quantidade--;
            if (cartItem.quantidade <= 0)
                this.removeItem(position, cart);
        });
    }

    handleItem(produto: ProdutoDTO, predicate: (cartItem: CartItem, position: number, cart: Cart) => void): Cart {
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(item => item.produto.id === produto.id);
        predicate(cart.itens[position], position, cart);
        this.storage.setCart(cart);
        return cart;
    }

    total(): number {
        return this.getCart().itens
            .map(item => item.produto.preco * item.quantidade)
            .reduce((prev, value) => prev + value, 0);
    }

}