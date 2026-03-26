import { NextFunction, Request, Response } from 'express';
import { Link } from '../model/link'; // Mongoose Link model
import mongoose from 'mongoose';
import { User } from '../model/profiles';

export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title, url } = req.body;

    // Check if user exists
    const userExists = await User.findById(userId);
    if (!userExists) {
       res.status(404).json({ message: 'User not found' });
       return
    }

    // Find the maximum order for the user's links
    const maxOrderLink = await Link.findOne({ userId }).sort({ order: -1 });
    const maxOrder = maxOrderLink ? maxOrderLink.order : 0;

    // Create a new link
    const newLink = new Link({
      userId,
      title,
      url,
      order: maxOrder + 1,
    });

    await newLink.save();
    res.status(201).json({
      message: 'Link created successfully',
      link: newLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getLinks = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { userId } = req.params;

    // Validate user ID
    const userExists = await User.findById(userId);
    if (!userExists) {
       res.status(404).json({ message: 'User not found' });
       return
    }

    const links = await Link.find({ userId }).sort({ order: 1 });
    res.status(200).json(links);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateLink = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const updatedLink = await Link.findByIdAndUpdate(
      id,
      { title, url, updatedAt: new Date() },
      { new: true }
    );

    if (!updatedLink) {
       res.status(404).json({ message: 'Link not found' });
      return
    }

    res.status(200).json({
      message: 'Link updated successfully',
      link: updatedLink,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteLink = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { id } = req.params;
    // console.log(id)
    const deletedLink = await Link.findByIdAndDelete(id);

    if (!deletedLink) {
       res.status(404).json({ message: 'Link not found' });
       return
    }

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const reorderLinks = async (req: Request, res: Response) : Promise<void> => {
  try {
    const { userId } = req.params;
    const { linkIds } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
      for (let index = 0; index < linkIds.length; index++) {
        const linkId = linkIds[index];
        await Link.findByIdAndUpdate(
          linkId,
          { order: index + 1 },
          { session }
        );
      }

      await session.commitTransaction();
      session.endSession();

      res.status(200).json({ message: 'Links reordered successfully' });
    } catch (error) {
      await session.abortTransaction();
      session.endSession();
      throw error;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
