import { Router } from 'express';
import passport from 'passport';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { pool } from '../config/database';
import { isAuthenticated } from '../middleware/auth';
import {  User as UserType} from '../types/types';
import { User } from '../model/profiles';

const router = Router();

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { session: false }),
  (req, res) => {
    // console.log(req.user)
    const token = jwt.sign(
      { id: (req.user as UserType).id, email: (req.user as UserType).email , username: (req.user as UserType).username },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    res.redirect(`${process.env.FRONTEND_URL}/oauth-callback?token=${token}`);
  }
);

router.get('/me', isAuthenticated, async (req, res, next) => {
  try {


    const id = (req.user as any).id;
    // console.log( 'username' , id)

    const user = await User.findOne({id: id});

    if(!user){
      res.status(400).json({message: 'User not found'})
      return
    }

    console.log('3');

    let profilePicture = null;
    if (user && user.profilePicture) {
      profilePicture = `data:image/jpeg;base64,${Buffer.from(user.profilePicture).toString('base64')}`;
    }




    // console.log('4' ,user);

    // const responseData = {
    //   name: user.name,
    //   email: user.email,
    //   googleId: user.googleId,
    //   totalVisit: user.totalVisit,
    //   profileImage: profilePicture,
    // };


    console.log('1');
    // const [rows] = await pool.execute(
    //   'SELECT id, username, name, email, totalVisit, description FROM users WHERE id = ?',
    //   [(req.user as any).id]
    // );

    // console.log('2');
    // if (!Array.isArray(rows) || rows.length === 0) {
    //   res.status(404).json({ message: 'User not found' });
    //   return;
    // }

    // const username = (req.user as any).username;

    // const media = await User.findOne({ username: username });
    // console.log('3');

    // let profilePicture = null;
    // if (media && media.profileImage) {
    //   profilePicture = `data:image/jpeg;base64,${Buffer.from(media.profileImage).toString('base64')}`;
    // }

    // console.log('4' ,{ ...rows[0], profilePicture});

    // const responseData = {
    //   ...rows[0],
    //   profileImage: profilePicture,
    // };

    const response = {
      ...user.toObject(),
      profilePicture: user.profilePicture ?
       `data:image/jpeg;base64,${Buffer.from(user.profilePicture).toString('base64')}`
       : null,

    }
// console.log(response)
    res.json(response);
  } catch (error) {
    console.error('Error fetching user data:', error);
    next(error);
  }
});



export default router;