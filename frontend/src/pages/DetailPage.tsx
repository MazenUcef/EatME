import { useGetRestaurant } from "@/api/RestaurantApi"
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useState } from "react";
import { useParams } from "react-router-dom"


export type CartItem = {
    _id: string;
    name: string;
    price: number;
    quantity: number;

}

const DetailPage = () => {
    const { restaurantId } = useParams()
    const { restaurant, isLoading } = useGetRestaurant(restaurantId);
    const [cartItems, setCartItemns] = useState<CartItem[]>([])

    if (isLoading || !restaurant) {
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
    return (
        <div className="flex flex-col gap-10">
            <AspectRatio ratio={16 / 5}>
                <img src={restaurant.imageUrl} className="rounded-md object-cover h-full w-full" />
            </AspectRatio>
            <div className="grid md:grid-cols-[4fr_2fr] gap-5 md:px-32">
                <div className="flex flex-col gap-4">
                    <RestaurantInfo restaurant={restaurant} />
                    <span className="text-2xl font-bold tracking-tight">Menu</span>
                    {restaurant.menuItems.map((menuItem, index) => (
                        <MenuItem menuItem={menuItem} key={index} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary restaurant={restaurant} cartItems={cartItems} />
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPage