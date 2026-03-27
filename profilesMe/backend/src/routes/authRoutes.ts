import { Router } from 'express';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { supabase } from '../config/database';
import { isAuthenticated } from '../middleware/auth';
import {  User as UserType} from '../types/types';

const router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  async (req, res) => {
    try {
      const user = req.user as UserType;
      
      // Check if user exists in Supabase, if not create them
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .eq('google_id', user.id)
        .single();

      if (!existingUser) {
        // Create new user in Supabase
        await supabase
          .from('users')
          .insert({
            google_id: user.id,
            email: user.email,
            name: user.name,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          });
      }

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
    } catch (error) {
      console.error('Error in Google callback:', error);
      res.redirect(`${process.env.FRONTEND_URL}/login?error=auth_failed`);
    }
  }
);

router.get('/me', isAuthenticated, async (req, res, next) => {
  try {
    const id = (req.user as any).id;

    // Find user by Google ID
    const { data: user, error } = await supabase
      .from('users')
      .select('*')
      .eq('google_id', id)
      .single();

    if (error || !user) {
      res.status(400).json({ message: 'User not found' });
      return;
    }

    const response = {
      ...user,
      profile_picture: user.profile_picture
        ? `data:image/jpeg;base64,${Buffer.from(user.profile_picture).toString('base64')}`
        : null,
    };

    res.json(response);
  } catch (error) {
    console.error('Error fetching user data:', error);
    next(error);
  }
});

export default router;