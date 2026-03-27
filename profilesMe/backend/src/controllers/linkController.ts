import { NextFunction, Request, Response } from 'express';
import { supabase } from '../config/database';

export const createLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId, title, url } = req.body;

    // Check if user exists
    const { data: userExists } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    // Find the maximum order for the user's links
    const { data: maxOrderLink } = await supabase
      .from('links')
      .select('order')
      .eq('user_id', userId)
      .order('order', { ascending: false })
      .limit(1)
      .single();

    const maxOrder = maxOrderLink ? maxOrderLink.order : 0;

    // Create a new link
    const { data: newLink, error } = await supabase
      .from('links')
      .insert({
        user_id: userId,
        title,
        url,
        order: maxOrder + 1,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (error) {
      console.error('Supabase error:', error);
      res.status(500).json({ message: 'Failed to create link', error: error.message });
      return;
    }

    res.status(201).json({
      message: 'Link created successfully',
      link: newLink,
    });
  } catch (error) {
    console.error('Error in createLink:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const getLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;

    // Validate user ID
    const { data: userExists } = await supabase
      .from('users')
      .select('id')
      .eq('id', userId)
      .single();

    if (!userExists) {
      res.status(404).json({ message: 'User not found' });
      return;
    }

    const { data: links } = await supabase
      .from('links')
      .select('*')
      .eq('user_id', userId)
      .order('order', { ascending: true });

    res.status(200).json(links || []);
  } catch (error) {
    console.error('Error in getLinks:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const updateLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { title, url } = req.body;

    const { data: updatedLink, error } = await supabase
      .from('links')
      .update({
        title,
        url,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error || !updatedLink) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }

    res.status(200).json({
      message: 'Link updated successfully',
      link: updatedLink,
    });
  } catch (error) {
    console.error('Error in updateLink:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const deleteLink = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;

    const { error: deleteError } = await supabase
      .from('links')
      .delete()
      .eq('id', id);

    if (deleteError) {
      res.status(404).json({ message: 'Link not found' });
      return;
    }

    res.status(200).json({ message: 'Link deleted successfully' });
  } catch (error) {
    console.error('Error in deleteLink:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};


export const reorderLinks = async (req: Request, res: Response): Promise<void> => {
  try {
    const { userId } = req.params;
    const { linkIds } = req.body;

    // Update each link's order
    const updates = linkIds.map((linkId: string, index: number) => 
      supabase
        .from('links')
        .update({ order: index + 1, updated_at: new Date().toISOString() })
        .eq('id', linkId)
        .eq('user_id', userId)
    );

    // Execute all updates
    const results = await Promise.all(updates);
    
    // Check if any update failed
    const hasError = results.some(result => result.error);
    if (hasError) {
      res.status(500).json({ message: 'Failed to reorder some links' });
      return;
    }

    res.status(200).json({ message: 'Links reordered successfully' });
  } catch (error) {
    console.error('Error in reorderLinks:', error);
    res.status(500).json({ message: 'Server error', error });
  }
};
