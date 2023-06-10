import express from 'express';
import User from '../models/userModel';

export const getAllusers = async (req: express.Request, res: express.Response) => {
    try {
        const allUsers = await User.find();
        res.status(200).json(allUsers)

    } catch (error) {
        res.status(400).json(error);
    }
}



// export const getChats = async(req:express.Request, res: express.Response)=>{

// }