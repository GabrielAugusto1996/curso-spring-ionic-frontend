import { Cart } from './../models/cart';
import { STORAGE_KEYS } from './../config/storage_keys.config';
import { LocalUser } from './../models/local_user';
import { Injectable } from '@angular/core';

@Injectable()
export class StorageService {

    getLocalUser(): LocalUser {
        let user = localStorage.getItem(STORAGE_KEYS.localUser);

        if (user == null) {
            return null;
        }

        return JSON.parse(user);
    }

    setLocalUser(obj : LocalUser) {

        if (obj == null) {
            this.removeLocalUser();
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    removeLocalUser() {
        localStorage.removeItem(STORAGE_KEYS.localUser);
    }

    getCart(): Cart {
        let cart = localStorage.getItem(STORAGE_KEYS.cart);

        if (cart == null) {
            return null;
        }

        return JSON.parse(cart);
    }

    setCart(obj : Cart) {

        if (obj == null) {
            this.removeCart();
        } else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }

    removeCart() {
        localStorage.removeItem(STORAGE_KEYS.cart);
    }

}