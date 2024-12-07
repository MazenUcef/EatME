import { Request } from "express";
import Stripe from "stripe";
import Restaurant, { MenuItemType } from "../models/restaurant";
import { url } from "inspector";

const STRIPE = new Stripe(process.env.STRIPE_API_KEY as string)
const FRONTEND_URL = process.env.FRONT_ENDURL as string;

type CheckoutSessionRequest = {
    cartItems: {
        menuItemId: string;
        name: string;
        quantity: string;
    }[];
    deilveryDetails: {
        email: string;
        name: string;
        addressLine1: string;
        city: string
    };
    restaurantId: string;
}

const createCheckoutSession = async (req: Request, res: any) => {
    try {
        const checkoutSessionRequest: CheckoutSessionRequest = req.body;

        const restaurant = await Restaurant.findById(checkoutSessionRequest.restaurantId)

        if (!restaurant) {
            throw new Error(`Could not find restaurant`)
        }

        const lineItems = createLineItems(checkoutSessionRequest, restaurant.menuItems)

        const session = await createSession(lineItems, "TEST_ORDER_ID", restaurant.deliveryPrice, restaurant._id.toString())

        if (!session.url) {
            res.status(500).json({ message: "Error creating stripe session" })
        }


        res.json({ url: session.url })
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ message: error.raw.message })
    }
};

const createLineItems = (checkoutSessionRequest: CheckoutSessionRequest, menuItems: MenuItemType[]) => {
    const lineItems = checkoutSessionRequest.cartItems.map((cartItem) => {
        const menuItem = menuItems.find((item) => item._id.toString() === cartItem.menuItemId.toString())

        if (!menuItem) {
            throw new Error(`Could not find menu item with id ${cartItem.menuItemId}`)
        }

        const line_Item: Stripe.Checkout.SessionCreateParams.LineItem = {
            price_data: {
                currency: "gbp",
                unit_amount: menuItem.price,
                product_data: {
                    name: menuItem.name,
                },
            },
            quantity: parseInt(cartItem.quantity),
        };
        return line_Item;
    })
    return lineItems;
}


const createSession = async (lineItems: Stripe.Checkout.SessionCreateParams.LineItem[], orderId: string, deliveryPrice: number, restaurantId: string) => {
    const sessionData = await STRIPE.checkout.sessions.create({
        line_items: lineItems,
        shipping_options: [
            {
                shipping_rate_data: {
                    display_name: "Delivery",
                    type: "fixed_amount",
                    fixed_amount: {
                        amount: deliveryPrice,
                        currency: "gbp"
                    },
                },
            },
        ],
        mode: "payment",
        metadata: {
            orderId,
            restaurantId
        },
        success_url: `${FRONTEND_URL}/order-status?success=true`,
        cancel_url: `${FRONTEND_URL}/detail/${restaurantId}?cancelled=true`
    });

    return sessionData;
}


export default {
    createCheckoutSession
}