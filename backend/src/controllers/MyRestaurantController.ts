import { Request } from "express";
import Restaurant from "../models/restaurant";
import cloudinary from 'cloudinary';
import mongoose from "mongoose";

const createMyRestaurante = async (req: Request, res: any) => {
    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId })
        if (existingRestaurant) {
            return res.status(400).json({ message: "You already have a restaurant created" })
        }

        const image = req.file as Express.Multer.File;
        const base64Image = Buffer.from(image.buffer).toString("base64");
        const dataURI = `data:${image.mimetype};base64,${base64Image}`;


        const uploadResponse = await cloudinary.v2.uploader.upload(dataURI);


        const restaurant = new Restaurant(req.body);

        restaurant.imageUrl = uploadResponse.url;
        restaurant.user = new mongoose.Types.ObjectId(req.userId);
        restaurant.lastUpdated = new Date();

        await restaurant.save();

        res.status(201).send(restaurant)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internat Server Error" })
    }
}

export default {
    createMyRestaurante
};