import express, { Request, Response } from 'express';
import cors from 'cors';
import 'dotenv/config'
import mongoose from 'mongoose';
import myUserRoute from './routes/MyUserRoutes';




mongoose.connect(process.env.MONGODB_CONNECTION as string)
    .then(() => {
        console.log("MongoDB connected successfully");  // connection is successful to MongoDB
    })
    .catch((err) => console.log(err))



const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/my/user", myUserRoute);



app.listen(7000, () => {
    console.log("Server is running on port 7000");  // server is listening on port 7000
})