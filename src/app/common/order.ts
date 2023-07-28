import { Customer } from "./customer";
import { OrderProduct } from "./order-product";
import { ShippingAddress } from "./shipping-address";
import { Summary } from "./summary";
import { User } from "./user";

export class Order {

    public id!: number;
    public customer: Customer;
    public shippingAddress: ShippingAddress;
    public summary: Summary;
    public user: User;
    public orderProducts: OrderProduct[]

    constructor(customer: Customer, shippingAddress: ShippingAddress, summary: Summary, user: User, orderProducts: OrderProduct[]) {
        this.customer = customer;
        this.shippingAddress = shippingAddress;
        this.summary = summary;
        this.user = user;
        this.orderProducts = orderProducts;
    }

}
