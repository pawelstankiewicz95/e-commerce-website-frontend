import { CartProduct } from "./cart-product";

export class OrderProduct {

    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(cartProduct: CartProduct) {
        this.quantity = cartProduct.quantity;
        this.name = cartProduct.name;
        this.description = cartProduct.description;
        this.unitPrice = cartProduct.unitPrice;
        this.imageUrl = cartProduct.imageUrl;
    };
}
