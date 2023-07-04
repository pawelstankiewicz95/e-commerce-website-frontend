import { Customer } from "./customer";
import { OrderProduct } from "./order-product";
import { ShippingAddress } from "./shipping-address";
import { Summary } from "./summary";

export class Order {

    public id!: number;
    public customer: Customer;
    public shippingAddress: ShippingAddress;
    public summary: Summary;
    public orderProducts: OrderProduct[]

    constructor(customer: Customer, shippingAddress: ShippingAddress, summary: Summary, orderProducts: OrderProduct[]) {
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.summary = summary;
        this.orderProducts = orderProducts;
    }

}
