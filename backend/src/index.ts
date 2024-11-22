import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoutes';
import myRestaurantRoute from './routes/MyRestaurantRoute';
import { v2 as cloudinary } from 'cloudinary';




mongoose.connect(process.env.MONGODB_CONNECTION as string)
    .then(() => {
        console.log("MongoDB connected successfully");  // connection is successful to MongoDB
    })
    .catch((err) => console.log(err))
 

cloudinary.config({
    cloud_name:"mazenafifi1999",
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})


const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/my/user", myUserRoute);
app.use("/api/my/restaurant", myRestaurantRoute);



app.listen(7000, () => {
    console.log("Server is running on port 7000");  // server is listening on port 7000
})