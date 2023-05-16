import { CartProduct } from "./cart-product";
import { User } from "./user";

export class Cart {
    constructor (public id: number, public user: User, public cartProducts: CartProduct[]){}
}
