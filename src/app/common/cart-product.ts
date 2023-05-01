import { Product } from "./product";

export class CartProduct {
    id: number;
    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(product: Product) {
        this.quantity = 1;
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
    };
}
