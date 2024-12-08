import { Order } from "@/types";
import { Separator } from "@radix-ui/react-separator";

type Props = {
    order: Order;
}

const OrderStatusDetail = ({ order }: Props) => {
    return <div className="space-y-5 text-white">
        <div className="flex flex-col">
            <span className="font-bold text-white">Delivering to:</span>
            <span>{order.deliveryDetails.name}</span>
            <span>{order.deliveryDetails.addressLine1} , {order.deliveryDetails.city}</span>
        </div>
        <div className="flex flex-col">
            <span className="font-bold">Your Order</span>
            <ul>
                {order.cartItems.map((item) => (
                    <li>
                        {item.name} x {item.quantity}
                    </li>
                ))}
            </ul>
        </div>
        <Separator />
        <div className="flex flex-col">
            <span className="font-bold text-white">Total</span>
            <span>${(order.totalAmount / 100).toFixed(2)}</span>
        </div>
    </div>
}

export default OrderStatusDetail;