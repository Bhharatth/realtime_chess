import express from 'express';
import Conversaions from '../models/conversationModel';

export const createConversations = async (req: express.Request, res: express.Response) => {
    const { senderId, receiverId } = req.body;
    if (!(senderId || receiverId)) {
        res.status(400).json("no users found")
    };

    try {
        const newConversaton = new Conversaions({
            members: [senderId, receiverId]
        });
        const savedConversation = await newConversaton.save();
        res.status(200).json(savedConversation);

    } catch (error) {
        res.status(400).json(error);
    }
}

export const getUserConversations = async (req: express.Request, res: express.Response) => {

    const { userId } = req.params;
    // const {userId} = req.body;

    try {
        if (userId) {
            const conversation = await Conversaions.find({
                members: { $in: [userId] },
            })
            res.status(200).json(conversation);
        };
    } catch (error) {
        res.status(400).json(error);
    }
}