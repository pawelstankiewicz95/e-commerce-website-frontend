import { Product } from "./product";

export class CartProduct {
    quantity: number = 1;
    constructor(public product: Product) {
        
    };

    computeTotalPrice(): number{
        return this.quantity * this.product.unitPrice;
    }
}
