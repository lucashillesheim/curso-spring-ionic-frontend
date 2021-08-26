import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { Cart } from "../models/cart";
import { LocalUser } from "../models/local_user";

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);
        return user ? JSON.parse(user) : null;
    }

    setLocalUser(obj: LocalUser) {
        obj ? localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj))
            : localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    getCart(): Cart {
        let cart = localStorage.getItem(STORAGE_KEYS.cart);
        return cart ? JSON.parse(cart) : null;
    }

    setCart(obj: Cart) {
        obj ? localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj))
            : localStorage.removeItem(STORAGE_KEYS.cart);
    }

}