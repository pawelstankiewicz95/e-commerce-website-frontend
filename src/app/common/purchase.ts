import { Customer } from "./customer";
import { OrderProduct } from "./order-product";
import { ShippingAddress } from "./shipping-address";
import { Summary } from "./summary";

export class Purchase {
    
    constructor(private customer: Customer,
        private shippingAddress: ShippingAddress,
        private summary: Summary,
        private orderProducts: OrderProduct[]) { }

}
