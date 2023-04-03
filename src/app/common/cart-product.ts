import { Product } from "./product";

export class CartProduct {
    quantity: number;

    id: number;
    name: string;
    description: string;
    unitPrice: number;
    unitsInStock: number;
    imageUrl: string;

    constructor(product: Product) {
        this.quantity = 1;
        this.id = product.id;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.unitsInStock = product.unitsInStock;
        this.imageUrl = product.imageUrl;
    };

    computeTotalPrice(): number{
        return this.quantity * this.unitPrice;
    }
}
