import { Customer } from "./customer";
import { OrderProduct } from "./order-product";
import { ShippingAddress } from "./shipping-address";
import { Summary } from "./summary";

export class Purchase {
    
    customer!: Customer;
    shippingAddress!: ShippingAddress;
    summary! : Summary;
    orderProducts!: OrderProduct[];
}
