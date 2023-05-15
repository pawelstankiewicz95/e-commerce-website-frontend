import { Product } from "./product";

export class CartProduct {
    surrogateId: number;
    id: number;
    quantity: number;
    name: string;
    description: string;
    unitPrice: number;
    imageUrl: string;

    constructor(product: Product) {
        this.surrogateId = 0;
        this.id = product.id;
        this.quantity = 1;
        this.name = product.name;
        this.description = product.description;
        this.unitPrice = product.unitPrice;
        this.imageUrl = product.imageUrl;
    };
}
