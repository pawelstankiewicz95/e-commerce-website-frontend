import { ProductCategory } from "./product-category";

export class Product {
    public id: number = 0;
    public sku: string = '';
    public name: string = '';
    public description: string = '';
    public unitPrice: number = 0;
    public imageUrl: string = '';
    public active: boolean = false;
    public unitsInStock: number = 0;
    public dateCreated: Date = new Date();
    public lastUpdated: Date = new Date();
    public productCategory!: ProductCategory;
}
