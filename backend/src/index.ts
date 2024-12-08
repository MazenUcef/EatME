import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config';
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoutes';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import RestaurantRoute from './routes/RestaurantRoute';
import OrderRoute from './routes/OrderRoute';
import { v2 as cloudinary } from 'cloudinary';
import OrderController from './controllers/OrderController';



mongoose.connect(process.env.MONGODB_CONNECTION as string)
    .then(() => {
        console.log("MongoDB connected successfully");  // Connection successful
    })
    .catch((err) => console.log(err));

cloudinary.config({
    cloud_name: "mazenafifi1999",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const app = express();

app.use(cors());

// Webhook Route (Must use raw body parser for Stripe)
app.post("/api/order/checkout/webhook", express.raw({ type: "*/*" }), OrderController.stripeWebhookHandler);

// JSON Parser Middleware (For all other routes)
app.use(express.json());

// Application Routes
app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);
app.use("/api/restaurant", RestaurantRoute);
app.use("/api/order", OrderRoute);

app.listen(7000, () => {
    console.log("Server is running on port 7000");  // Server is listening on port 7000
});
