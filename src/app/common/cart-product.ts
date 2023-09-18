import { Product } from "./product";

export class CartProduct {
    cartProductId: number;
    productId: number;
    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(product: Product) {
        this.cartProductId = 0;
        this.productId = product.id;
        this.quantity = 1;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
    };
}
