import { CartProduct } from "./cart-product";
import { Product } from "./product";

export class OrderProduct {
 //   productId: number;
    product: Product;
    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(cartProduct: CartProduct) {
        this.product = cartProduct.product;
        this.quantity = cartProduct.quantity;
        this.name = cartProduct.name;
        this.description = cartProduct.description;
        this.unitPrice = cartProduct.unitPrice;
        this.imageUrl = cartProduct.imageUrl;
    };
}
