import { OrderStatus } from "@/types";

type OrderStatusInfo = {
    label: string;
    value: OrderStatus;
    progressValue: number;
}

export const ORDER_STATUS: OrderStatusInfo[] = [
    { label: "Placed", value: "placed", progressValue: 0 },
    { label: "Awaiting Restaurant Confirmation", value: "paid", progressValue: 25 },
    { label: "In Progress", value: "inProgress", progressValue: 50 },
    { label: "On the Way", value: "outForDelivery", progressValue: 75 },
    { label: "Completed", value: "delivered", progressValue: 100 },
]