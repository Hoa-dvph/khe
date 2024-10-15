import { StatusCodes } from "http-status-codes";
import { Topic } from "../models/topic";

export const createTopic = async (req, res) => {
    try {
        const { name } = req.body;
        const newTopic = await Topic.create({ name });
        res.status(StatusCodes.CREATED).json({ message: 'Topic created successfully', topic: newTopic });

    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while creating the topic' });
    }
}

export const getIdTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const topic = await Topic.findById(id);
        if (!topic) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Topic not found' });
        res.json({ message: 'Topic retrieved successfully', topic });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while retrieving the topic' });
    }
}

export const getAllTopics = async (req, res) => {
    try {
        const topics = await Topic.find();
        res.json({ message: 'Topics retrieved successfully', topics });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while retrieving the topics' });
    }
}

export const updateTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedTopic = await Topic.findByIdAndUpdate(id, { new: true });
        if (!updatedTopic) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Topic not found' });
        res.json({ message: 'Topic updated successfully', topic: updatedTopic });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while updating the topic' });
    }
}

export const deleteTopic = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedTopic = await Topic.findByIdAndDelete(id);
        if (!deletedTopic) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Topic not found' });
        res.json({ message: 'Topic deleted successfully', deletedTopic });
    } catch (error) {
        console.error(error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: 'An error occurred while deleting the topic' });
    }
}
