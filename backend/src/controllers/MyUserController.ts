import { Request, Response } from "express";
import User from "../models/user";


const createCurrentUser = async (req: Request, res: any) => {
    // 1. check if the user exist 
    // 2.create a new user
    // 3. return the user
    try {
        const { auth0Id } = req.body;
        const existingUser = await User.findOne({ auth0Id });
        if (existingUser) {
            return res.status(200).send()
        }
        const newUser = new User(req.body);
        await newUser.save()
        res.status(201).send(newUser.toObject())
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error creating user" })
    }
}



export default {
    createCurrentUser,
} 