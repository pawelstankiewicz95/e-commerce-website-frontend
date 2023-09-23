import { Product } from "./product";

export class CartProduct {
    cartProductId: number;
    product: Product;
    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(product: Product) {
        this.cartProductId = 0;
        this.product = product;
        this.quantity = 1;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
    };
}
