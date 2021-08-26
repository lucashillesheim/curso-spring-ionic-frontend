import { Injectable } from "@angular/core";
import { Cart } from "../../models/cart";
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
        let cart: Cart = this.getCart();
        let position = cart.itens.findIndex(item => item.produto.id === produto.id);
        if (position === -1) {
            cart.itens.push({ produto: produto, quantidade: 1 });
        }
        this.storage.setCart(cart);
        return cart;
    }

}