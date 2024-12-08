import { userGetMyOrder } from "@/api/OrderApi"
import OrderStatusDetail from "@/components/OrderStatusDetail"
import OrderStatusHeader from "@/components/OrderStatusHeader"
import { AspectRatio } from "@/components/ui/aspect-ratio"
import { Skeleton } from "@/components/ui/skeleton"


const OrderStatusPage = () => {
    const { isLoading, orders } = userGetMyOrder()

    if (isLoading) {
        return (
            <div className="flex flex-col justify-center items-center space-y-3">
                <Skeleton className="h-[125px] w-full rounded-xl" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-[40rem]" />
                    <Skeleton className="h-4 w-[30rem]" />
                </div>
            </div>
        )
    }

    if (!orders || orders.length === 0) {
        return "NO orders found";
    }
    return (
        <div className="space-y-10">
            {orders.map((order) => (
                <div className="space-y-10 bg-secondaryy p-10 rounded-lg">
                    <OrderStatusHeader order={order} />
                    <div className="grid gap-10 md:grid-cols-2">
                        <OrderStatusDetail order={order} />
                        <AspectRatio ratio={16 / 5}>
                            <img
                                src={order.restaurant.imageUrl}
                                className="rounded-md object-cover h-full w-full"
                            />
                        </AspectRatio>
                    </div>
                </div>
            ))}
        </div>
    )
}

export default OrderStatusPage