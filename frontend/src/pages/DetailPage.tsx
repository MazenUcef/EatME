import { useGetRestaurant } from "@/api/RestaurantApi"
import { CheckoutButton } from "@/components/CheckoutButton";
import MenuItem from "@/components/MenuItem";
import OrderSummary from "@/components/OrderSummary";
import RestaurantInfo from "@/components/RestaurantInfo";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Card, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { userFormData } from "@/forms/user-profile-form/UserProfileForm";
import { MenuItem as MenuItemType } from "@/types";
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
    const [cartItems, setCartItemns] = useState<CartItem[]>(() => {
        const storedCartItems = sessionStorage.getItem(`cartItems-${restaurantId}`);
        return storedCartItems ? JSON.parse(storedCartItems) : [];
    })


    const addToCart = (menuItem: MenuItemType) => {
        setCartItemns((prev) => {
            const existingCartItem = prev.find((item) => item._id === menuItem._id)
            let updatedCartItem;

            if (existingCartItem) {
                updatedCartItem = prev.map((cartItem) => cartItem._id === menuItem._id ?
                    { ...cartItem, quantity: cartItem.quantity + 1 }
                    :
                    cartItem
                )
            } else {
                updatedCartItem = [...prev, {
                    _id: menuItem._id,
                    name: menuItem.name,
                    price: menuItem.price,
                    quantity: 1,
                }]
            }

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItem))

            return updatedCartItem;
        })
    }

    const removeFromCart = (cartItem: CartItem) => {
        setCartItemns((prev) => {
            const updatedCartItems = prev.filter((item) => cartItem._id !== item._id)

            sessionStorage.setItem(`cartItems-${restaurantId}`, JSON.stringify(updatedCartItems))

            return updatedCartItems;
        })
    }

    const onCheckout = (userFormData: userFormData) => {
        console.log(userFormData);

    }

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
                        <MenuItem addToCart={() => addToCart(menuItem)} menuItem={menuItem} key={index} />
                    ))}
                </div>
                <div>
                    <Card>
                        <OrderSummary removeFromCart={removeFromCart} restaurant={restaurant} cartItems={cartItems} />
                        <CardFooter>
                            <CheckoutButton
                                disabled={cartItems.length === 0}
                                onCheckout={onCheckout}
                            />
                        </CardFooter>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default DetailPage