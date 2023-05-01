import { CartProduct } from "./cart-product";
import { User } from "./user";

export class Cart {
    constructor (private user: User, public cartProducts: CartProduct[]){}
}
